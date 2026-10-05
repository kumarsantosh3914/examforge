import { readBank } from '../src/lib/data';
import { getDb, getClient, collections } from '../src/lib/db';
import { seedBank } from '../src/lib/seed';
let client;
try {
  const bank = await readBank();
  client = await getClient();
  const db = await getDb();
  console.log(JSON.stringify(await seedBank(db, bank), null, 2));
  for (const q of bank.excluded) console.log(`Quarantined: ${q.id} — ${q.reason}`);
  const c = collections(db);
  const counts = await Promise.all([c.subjects.countDocuments({ active: true }), c.sets.countDocuments({ active: true }), c.questions.countDocuments({ active: true })]);
  console.log(`Database active totals — Subjects: ${counts[0]}, Sets: ${counts[1]}, Questions: ${counts[2]}`);
} catch (error) {
  console.error('Seed failed:', error instanceof Error ? error.name : 'Unknown error');
  process.exitCode = 1;
} finally { await client?.close(); }
