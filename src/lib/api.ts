import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { collections, ensureIndexes, getClient, getDb } from './db';
import { authenticate, createGuest, resolveIdentity } from './auth';
import { AppError } from './errors';
import { rateLimit } from './security';
import { readCatalog } from './catalog';
import { finalizeAttempt, getAttempt, getResult, ownerFilter, saveAnswer, startAttempt, submitAttempt } from './attempts';
import type { Identity, SessionView } from './types';

const uuid = z.uuid();
const setInput = z.object({ setId: z.string().min(1).max(250).regex(/^[a-z0-9./-]+$/) }).strict();
const answerInput = z.object({ index: z.number().int().min(0).max(9999), option: z.enum(['A', 'B', 'C', 'D', 'E']).nullable(), revision: z.number().int().nonnegative() }).strict();
const guestCookie = 'ef_guest'; const authCookie = 'ef_session';
let indexes: Promise<void> | undefined;
const cookieSettings = (days: number) => ({ httpOnly: true, sameSite: 'lax' as const, secure: (process.env.APP_ORIGIN || '').startsWith('https://'), path: '/', maxAge: days * 86400 });
async function body(request: NextRequest) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new AppError(415, 'JSON_REQUIRED', 'Please send a JSON request.');
  const reader = request.body?.getReader();
  if (!reader) throw new AppError(400, 'INVALID_INPUT', 'Request body is required.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); throw new AppError(413, 'TOO_LARGE', 'The request is too large.'); }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown; }
  catch { throw new AppError(400, 'INVALID_JSON', 'The request could not be read.'); }
}
export async function handleApi(request: NextRequest) {
  const responseCookies: { name: string; value: string; days: number }[] = [];
  const respond = (value: unknown, status = 200) => {
    const response = NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store, private', Vary: 'Cookie', ...(status === 429 ? { 'Retry-After': '900' } : {}) } });
    for (const cookie of responseCookies) response.cookies.set(cookie.name, cookie.value, cookieSettings(cookie.days));
    return response;
  };
  try {
    const method = request.method;
    if (!['GET', 'POST', 'PATCH'].includes(method)) throw new AppError(405, 'METHOD_NOT_ALLOWED', 'This action is unavailable.');
    if (method !== 'GET') {
      const configured = process.env.APP_ORIGIN;
      if (!configured || request.headers.get('origin') !== new URL(configured).origin) throw new AppError(403, 'INVALID_ORIGIN', 'This request could not be verified. Please reload the page.');
    }
    const db = await getDb(); const client = await getClient(); const c = collections(db);
    if (!indexes) indexes = ensureIndexes(db).catch(e => { indexes = undefined; throw e; });
    await indexes;
    const path = request.nextUrl.pathname.replace(/^\/api\//, '').split('/');
    // The rightmost entry is the one appended by the trusted proxy; earlier entries are client-controlled.
    const ip = process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || 'unknown' : 'direct';
    let identity = await resolveIdentity(db, request.cookies.get(guestCookie)?.value, request.cookies.get(authCookie)?.value);
    const requireIdentity = (): Identity => {
      if (!identity) throw new AppError(401, 'SESSION_REQUIRED', 'Please reload the page to restore your practice session.');
      return identity;
    };
    if (path.join('/') === 'catalog' && method === 'GET') {
      return respond(await readCatalog(db));
    }
    if (path.join('/') === 'session' && method === 'GET') {
      if (!identity) {
        await rateLimit(db, `guest-create:${ip}`, 1000, 3600);
        const guest = await createGuest(db);
        identity = { actorId: guest.actorId, guestId: guest.actorId };
        responseCookies.push({ name: guestCookie, value: guest.raw, days: 365 });
      }
      let active = await c.attempts.findOne({ ...ownerFilter(identity), status: 'IN_PROGRESS' }, { sort: { startedAt: -1 } });
      if (active && active.endsAt <= new Date()) { await finalizeAttempt(client, db, active._id); active = null; }
      const actor = await c.actors.findOne({ _id: identity.actorId });
      const result: SessionView = { email: identity.email || null, remaining: identity.userId ? 3 : actor?.claimedBy ? 0 : Math.max(0, 3 - (actor?.completed || 0)), completed: actor?.completed || 0, activeAttempt: active ? { id: active._id, title: active.title } : null };
      return respond(result);
    }
    if (path[0] === 'auth' && path.length === 2 && method === 'POST') {
      const owner = requireIdentity();
      if (path[1] === 'logout') {
        if (owner.sessionId) await c.sessions.deleteOne({ _id: owner.sessionId });
        responseCookies.push({ name: authCookie, value: '', days: 0 });
        return respond({ ok: true });
      }
      if (path[1] === 'register' || path[1] === 'login') {
        await rateLimit(db, `auth-ip:${ip}`, 100, 900);
        await rateLimit(db, `auth-session:${owner.actorId}`, 15, 900);
        const input = await body(request);
        if (input && typeof input === 'object' && 'email' in input && typeof input.email === 'string') await rateLimit(db, `auth-email:${input.email.toLowerCase().slice(0, 254)}`, 12, 900);
        const auth = await authenticate(client, db, owner, input, path[1]);
        responseCookies.push({ name: authCookie, value: auth.sessionToken, days: 30 });
        return respond({ email: auth.email }, path[1] === 'register' ? 201 : 200);
      }
    }
    if (path[0] === 'attempts') {
      const owner = requireIdentity();
      if (method !== 'GET') await rateLimit(db, `attempt:${owner.actorId}`, 240, 60);
      if (path.length === 1 && method === 'POST') {
        const input = setInput.parse(await body(request));
        return respond(await startAttempt(client, db, owner, input.setId), 201);
      }
      if (path.length === 1 && method === 'GET') {
        const page = z.coerce.number().int().min(1).max(10000).parse(request.nextUrl.searchParams.get('page') || '1');
        const overdue = await c.attempts.find({ ...ownerFilter(owner), status: 'IN_PROGRESS', endsAt: { $lte: new Date() } }, { projection: { _id: 1 } }).limit(10).toArray();
        for (const a of overdue) await finalizeAttempt(client, db, a._id);
        const attempts = await c.attempts.find(ownerFilter(owner), { projection: { _id: 1, title: 1, subject: 1, startedAt: 1, endsAt: 1, status: 1, result: 1 } }).sort({ startedAt: -1 }).skip((page - 1) * 20).limit(21).toArray();
        return respond({ attempts: attempts.slice(0, 20).map(({ _id, ...a }) => ({ id: _id, ...a })), hasMore: attempts.length > 20 });
      }
      const id = uuid.parse(path[1]);
      if (path.length === 2 && method === 'GET') return respond(await getAttempt(client, db, owner, id));
      if (path.length === 3 && path[2] === 'answer' && method === 'PATCH') return respond(await saveAnswer(client, db, owner, id, answerInput.parse(await body(request))));
      if (path.length === 3 && path[2] === 'submit' && method === 'POST') return respond(await submitAttempt(client, db, owner, id));
      if (path.length === 3 && path[2] === 'result' && method === 'GET') return respond(await getResult(client, db, owner, id));
    }
    throw new AppError(404, 'NOT_FOUND', 'The requested page or action was not found.');
  } catch (error) {
    if (error instanceof AppError) return respond({ error: error.message, code: error.code }, error.status);
    if (error instanceof ZodError) return respond({ error: 'Check the information you entered and try again.', code: 'INVALID_INPUT' }, 400);
    // Log only classification: never raw driver errors, URIs, passwords or user input.
    console.error('[api]', error instanceof Error ? error.name : 'UnknownError');
    return respond({ error: 'We could not connect right now. Your saved progress is safe. Please try again shortly.', code: 'SERVICE_UNAVAILABLE' }, 503);
  }
}
