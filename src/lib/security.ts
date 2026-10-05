import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import type { Db } from 'mongodb';
import { collections } from './db';
import { AppError } from './errors';

const deriveKey = (password: string, salt: string) => new Promise<Buffer>((resolve, reject) => {
  scrypt(password, salt, 64, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 }, (error, key) => error ? reject(error) : resolve(key));
});
export const token = () => randomBytes(32).toString('hex');
export const tokenHash = (value: string) => createHash('sha256').update(value).digest('hex');
export const credentialsSchema = z.object({ email: z.string().trim().max(254).pipe(z.email()).transform(v => v.toLowerCase()), password: z.string().min(10, 'Use at least 10 characters.').max(128) }).strict();
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const key = await deriveKey(password, salt);
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password: string, stored: string) {
  const [algorithm, salt, encoded] = stored.split(':');
  if (algorithm !== 'scrypt' || !salt || !encoded) return false;
  const key = await deriveKey(password, salt);
  const expected = Buffer.from(encoded, 'hex');
  return expected.length === key.length && timingSafeEqual(expected, key);
}
export async function rateLimit(db: Db, key: string, maximum: number, seconds: number) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters');
  const window = Math.floor(Date.now() / (seconds * 1000));
  const id = createHmac('sha256', secret).update(`${key}:${window}`).digest('hex');
  const limits = collections(db).limits;
  try { await limits.updateOne({ _id: id }, { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * seconds * 1000) } }, { upsert: true }); }
  catch (e) { if ((e as { code?: number }).code !== 11000) throw e; await limits.updateOne({ _id: id }, { $inc: { count: 1 } }); }
  const value = await limits.findOne({ _id: id });
  if (!value || value.count > maximum) throw new AppError(429, 'RATE_LIMIT', 'Too many requests. Please wait a few minutes and try again.');
}
