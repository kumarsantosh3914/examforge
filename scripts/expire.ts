import { getClient, getDb } from '../src/lib/db';
import { expireAttempts } from '../src/lib/attempts';
const client = await getClient();
try { console.log(`Finalized ${await expireAttempts(client, await getDb())} expired attempts`); }
finally { await client.close(); }
