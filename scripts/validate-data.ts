import { readBank } from '../src/lib/data';
const bank = await readBank();
console.log(`Subjects: ${bank.subjects.length}\nSets: ${bank.sets.length}\nSource questions: ${bank.sourceQuestions}\nUsable questions: ${bank.questions.length}\nQuarantined: ${bank.excluded.length}`);
for (const q of bank.excluded) console.log(`Quarantined ${q.id}: ${q.reason}`);
