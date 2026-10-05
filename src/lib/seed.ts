import type { Db, Document } from 'mongodb';
import { digest, type Bank } from './data';
import { ensureIndexes } from './db';

export async function seedBank(db: Db, bank: Bank) {
  await ensureIndexes(db);
  const summary = { subjects: bank.subjects.length, sets: bank.sets.length, questions: bank.questions.length, inserted: 0, updated: 0, skipped: 0, quarantined: bank.excluded.length, deactivated: 0, errors: 0 };
  // Validate all files before calling this function. Seeding is rerunnable after interruption.
  for (const name of ['exams', 'subjects', 'sets', 'questions'] as const) {
    const coll = db.collection<Document & { _id: string }>(name);
    const docs = bank[name];
    const existing = new Map((await coll.find({}, { projection: { _id: 1, digest: 1, active: 1 } }).toArray()).map(d => [d._id, d]));
    const changes = [];
    for (const doc of docs) {
      const hash = digest(doc); const old = existing.get(doc._id);
      if (old?.digest === hash && old.active) { summary.skipped++; continue; }
      if (old) summary.updated++; else summary.inserted++;
      changes.push({ updateOne: { filter: { _id: doc._id }, update: { $set: { ...doc, digest: hash } }, upsert: true } });
    }
    if (changes.length) await coll.bulkWrite(changes, { ordered: true });
    const ids = docs.map(d => d._id);
    // Only retire records in the imported exam namespaces, never unrelated datasets.
    const scope = name === 'exams' ? { _id: { $in: bank.exams.map(e => e._id) } } : name === 'questions' ? { setId: { $in: [...bank.sets.map(s => s._id), ...(await db.collection('sets').find({ examId: { $in: bank.exams.map(e => e._id) } }).toArray()).map(s => s._id)] } } : { examId: { $in: bank.exams.map(e => e._id) } };
    const retired = await coll.updateMany({ $and: [scope, { _id: { $nin: ids }, active: true }] }, { $set: { active: false } });
    summary.deactivated += retired.modifiedCount;
  }
  return summary;
}
