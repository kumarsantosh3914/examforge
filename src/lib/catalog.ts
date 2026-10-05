import 'server-only';
import { cache } from 'react';
import type { Db } from 'mongodb';
import { collections, getDb } from './db';
import type { Catalog } from './types';

export async function readCatalog(db: Db): Promise<Catalog> {
  const c = collections(db);
  const [exams, subjects, sets] = await Promise.all([
    c.exams.find({ active: true }, { projection: { digest: 0 } }).toArray(),
    c.subjects.find({ active: true }, { projection: { digest: 0 } }).sort({ order: 1 }).toArray(),
    c.sets.find({ active: true }, { projection: { digest: 0 } }).sort({ number: 1 }).toArray(),
  ]);
  return { exams, subjects, sets };
}

// One read per request, shared by metadata and the page. Pages fall back to the
// client-side fetch when this fails, so a database hiccup never blanks a page.
export const getCatalog = cache(async () => readCatalog(await getDb()));
export const getCatalogOrNull = cache(async () => getCatalog().catch(() => null));
