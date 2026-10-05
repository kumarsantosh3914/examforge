import { randomUUID } from 'node:crypto';
import type { Db, MongoClient } from 'mongodb';
import { collections } from './db';
import { AppError } from './errors';
import { credentialsSchema, hashPassword, token, tokenHash, verifyPassword } from './security';
import type { Identity } from './types';

export async function createGuest(db: Db) {
  const c = collections(db); const actorId = randomUUID(); const raw = token();
  await c.actors.insertOne({ _id: actorId, kind: 'guest', completed: 0, activeAttempt: null, revision: 0, createdAt: new Date() });
  await c.sessions.insertOne({ _id: tokenHash(raw), actorId, kind: 'guest', expiresAt: new Date(Date.now() + 365 * 86400000) });
  return { raw, actorId };
}
export async function resolveIdentity(db: Db, guestToken?: string, authToken?: string): Promise<Identity | null> {
  const c = collections(db); const now = new Date();
  const read = (raw: string | undefined, kind: 'guest' | 'user') => raw && /^[a-f0-9]{64}$/.test(raw) ? c.sessions.findOne({ _id: tokenHash(raw), kind, expiresAt: { $gt: now } }) : Promise.resolve(null);
  const [guest, auth] = await Promise.all([read(guestToken, 'guest'), read(authToken, 'user')]);
  if (auth) {
    const user = await c.users.findOne({ _id: auth.actorId });
    if (user) return { actorId: user._id, userId: user._id, email: user.email, sessionId: auth._id, guestId: guest?.actorId };
  }
  if (guest && await c.actors.findOne({ _id: guest.actorId })) return { actorId: guest.actorId, guestId: guest.actorId };
  return null;
}
export async function authenticate(client: MongoClient, db: Db, identity: Identity, raw: unknown, mode: 'register' | 'login') {
  const input = credentialsSchema.parse(raw); const c = collections(db);
  let user = await c.users.findOne({ email: input.email });
  if (mode === 'register') {
    if (user) throw new AppError(409, 'ACCOUNT_EXISTS', 'Unable to create an account with these details. Try signing in.');
    user = { _id: randomUUID(), email: input.email, passwordHash: await hashPassword(input.password), createdAt: new Date() };
    const newUser = user;
    try {
      await client.withSession(session => session.withTransaction(async () => {
        await c.users.insertOne(newUser, { session });
        await c.actors.insertOne({ _id: newUser._id, kind: 'user', completed: 0, activeAttempt: null, revision: 0, createdAt: new Date() }, { session });
      }));
    } catch (error) {
      if ((error as { code?: number }).code === 11000) throw new AppError(409, 'ACCOUNT_EXISTS', 'Unable to create an account with these details. Try signing in.');
      throw error;
    }
  } else {
    // Always perform the same KDF even for unknown emails to limit timing disclosure.
    const dummy = `scrypt:${'0'.repeat(32)}:${'0'.repeat(128)}`;
    const valid = await verifyPassword(input.password, user?.passwordHash || dummy);
    if (!user || !valid) throw new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is incorrect.');
  }
  const currentUser = user;
  const sessionToken = token();
  await client.withSession(session => session.withTransaction(async () => {
    if (identity.guestId) {
      const guest = await c.actors.findOneAndUpdate({ _id: identity.guestId, kind: 'guest', $or: [{ claimedBy: { $exists: false } }, { claimedBy: currentUser._id }] }, { $set: { claimedBy: currentUser._id }, $inc: { revision: 1 } }, { session, returnDocument: 'after' });
      if (guest) {
        await c.attempts.updateMany({ ownerId: guest._id }, { $set: { userId: currentUser._id } }, { session });
        // Hand an in-progress guest test to the account actor so the one-active-attempt lock still holds.
        const account = await c.actors.findOne({ _id: currentUser._id }, { session });
        const busy = account?.activeAttempt && await c.attempts.countDocuments({ _id: account.activeAttempt, status: 'IN_PROGRESS' }, { session });
        if (guest.activeAttempt && !busy) {
          const moved = await c.attempts.updateOne({ _id: guest.activeAttempt, status: 'IN_PROGRESS' }, { $set: { ownerId: currentUser._id } }, { session });
          if (moved.modifiedCount) {
            await c.actors.updateOne({ _id: currentUser._id }, { $set: { activeAttempt: guest.activeAttempt }, $inc: { revision: 1 } }, { session });
            await c.actors.updateOne({ _id: guest._id }, { $set: { activeAttempt: null } }, { session });
          }
        }
      }
    }
    if (identity.sessionId) await c.sessions.deleteOne({ _id: identity.sessionId }, { session });
    await c.sessions.insertOne({ _id: tokenHash(sessionToken), actorId: currentUser._id, kind: 'user', expiresAt: new Date(Date.now() + 30 * 86400000) }, { session });
  }));
  return { sessionToken, email: currentUser.email };
}
