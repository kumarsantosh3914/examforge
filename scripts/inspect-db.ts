import { getClient, getDb } from '../src/lib/db';
let client;
try {
  client = await getClient();
  const db = await getDb();
  await db.command({ ping: 1 });
  for (const c of await db.listCollections().toArray()) console.log(`${c.name}: ${await db.collection(c.name).countDocuments()}`);
} catch (error) { console.error('Database connection failed:', error instanceof Error ? error.name : 'Unknown error'); process.exitCode = 1; }
finally { await client?.close(); }
