import assert from 'node:assert/strict';
import test from 'node:test';
import type { Db } from 'mongodb';
import { readBank } from '../src/lib/data';
import { seedBank } from '../src/lib/seed';

class Cursor {
  constructor(private values: Record<string, unknown>[]) {}
  async toArray() { return this.values.map(value => ({ ...value })); }
}
class MemoryCollection {
  docs = new Map<string, Record<string, unknown>>();
  async createIndex() { return 'index'; }
  find() { return new Cursor([...this.docs.values()]); }
  async bulkWrite(operations: { updateOne: { filter: { _id: string }; update: { $set: Record<string, unknown> } } }[]) {
    for (const operation of operations) this.docs.set(operation.updateOne.filter._id, { ...this.docs.get(operation.updateOne.filter._id), ...operation.updateOne.update.$set });
    return {};
  }
  async updateMany(filter: Record<string, unknown>, update: { $set: Record<string, unknown> }) {
    let modifiedCount = 0;
    const excluded = ((filter.$and as Record<string, unknown>[])?.[1]?._id as { $nin?: string[] })?.$nin || [];
    for (const [id, doc] of this.docs) if (!excluded.includes(id) && doc.active === true && update.$set.active === false) { this.docs.set(id, { ...doc, active: false }); modifiedCount++; }
    return { modifiedCount };
  }
}
class MemoryDb {
  stores = new Map<string, MemoryCollection>();
  collection(name: string) { if (!this.stores.has(name)) this.stores.set(name, new MemoryCollection()); return this.stores.get(name)!; }
}

test('seed is idempotent and does not duplicate imported records', async () => {
  const db = new MemoryDb(); const bank = await readBank();
  const first = await seedBank(db as unknown as Db, bank);
  const counts = Object.fromEntries(['exams', 'subjects', 'sets', 'questions'].map(name => [name, db.collection(name).docs.size]));
  const second = await seedBank(db as unknown as Db, bank);
  assert.deepEqual(counts, { exams: 5, subjects: 35, sets: 255, questions: 11542 });
  assert.equal(first.inserted, 11837);
  assert.equal(second.inserted, 0);
  assert.equal(second.updated, 0);
  assert.equal(second.skipped, 11837);
});
