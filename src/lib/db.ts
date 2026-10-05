import { MongoClient, type Db } from 'mongodb';
import type { Actor, Attempt, Exam, PracticeSet, Session, StoredQuestion, Subject, User } from './types';

const globalDb = globalThis as unknown as { mongo?: Promise<MongoClient> };
export async function getClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Database configuration is missing');
  if (!globalDb.mongo) {
    globalDb.mongo = new MongoClient(uri, { maxPoolSize: 20, serverSelectionTimeoutMS: 8000 }).connect().catch(error => { globalDb.mongo = undefined; throw error; });
  }
  return globalDb.mongo;
}
export async function getDb() { return (await getClient()).db(process.env.MONGODB_DB || 'examforge_dev'); }
export const collections = (db: Db) => ({
  exams: db.collection<Exam>('exams'), subjects: db.collection<Subject>('subjects'),
  sets: db.collection<PracticeSet>('sets'), questions: db.collection<StoredQuestion>('questions'),
  actors: db.collection<Actor>('actors'), users: db.collection<User>('users'),
  sessions: db.collection<Session>('sessions'), attempts: db.collection<Attempt>('attempts'),
  limits: db.collection<{ _id: string; count: number; expiresAt: Date }>('rateLimits'),
});
export async function ensureIndexes(db: Db) {
  const c = collections(db);
  await Promise.all([
    c.subjects.createIndex({ examId: 1, slug: 1 }, { unique: true }),
    c.subjects.createIndex({ active: 1, order: 1 }),
    c.sets.createIndex({ subjectId: 1, number: 1 }, { unique: true }),
    c.sets.createIndex({ active: 1, examId: 1 }),
    c.questions.createIndex({ setId: 1, order: 1 }),
    c.users.createIndex({ email: 1 }, { unique: true }),
    c.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    c.sessions.createIndex({ actorId: 1 }),
    c.actors.createIndex({ claimedBy: 1 }),
    c.attempts.createIndex({ ownerId: 1, startedAt: -1 }),
    c.attempts.createIndex({ userId: 1, startedAt: -1 }),
    c.attempts.createIndex({ status: 1, endsAt: 1 }),
    c.limits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);
}
