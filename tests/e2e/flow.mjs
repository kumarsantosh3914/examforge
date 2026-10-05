import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { MongoClient } from 'mongodb';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

// Drives a running app (npm run dev) end to end. MONGODB_URI/MONGODB_DB must point at the
// same database as the server: deadlines are moved in the database to exercise expiry.
const BASE = process.env.E2E_BASE_URL || 'http://localhost:3000';
const OUT = 'test-results/e2e/';
mkdirSync(OUT, { recursive: true });
const mongo = await new MongoClient(process.env.MONGODB_URI).connect();
const db = mongo.db(process.env.MONGODB_DB);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => consoleErrors.push(String(e)));
const step = async (name, fn) => { process.stdout.write(`• ${name} … `); await fn(); console.log('ok'); };
const shot = (p, name) => p.screenshot({ path: `${OUT}${name}.png`, fullPage: true });
const attemptId = () => page.url().split('/test/')[1];

await step('library loads with seeded counts', async () => {
  await page.goto(BASE);
  await page.getByText('3 of 3 free attempts available').waitFor();
  const strip = await page.locator('.stats-strip').innerText();
  assert.match(strip, /14[\s\S]*70[\s\S]*2,098/);
  await shot(page, 'desktop-library');
});

await step('subject page lists sets', async () => {
  await page.locator('.subject-card').first().click();
  await page.getByRole('button', { name: /Start test/ }).first().waitFor();
  assert.equal(await page.locator('.set-card').count(), 5);
  await shot(page, 'desktop-subject');
});

let first;
await step('guest starts a test, answers, and autosaves', async () => {
  await page.getByRole('button', { name: /Start test/ }).first().click();
  await page.waitForURL(/\/test\//);
  first = attemptId();
  await page.locator('.answer-option').first().click();
  await page.getByText('Saved to your session').waitFor();
  await page.getByRole('button', { name: /^Next/ }).click();
  await page.locator('.answer-option').nth(1).click();
  await page.getByText('2/', { exact: false }).first().waitFor();
  await shot(page, 'desktop-test');
});

await step('refresh resumes with answers intact', async () => {
  await page.reload();
  await page.locator('.palette button.answered').nth(1).waitFor();
  assert.equal(await page.locator('.palette button.answered').count(), 2);
});

await step('active-attempt API does not leak answers', async () => {
  const body = await page.evaluate(async id => (await fetch(`/api/attempts/${id}`)).json(), first);
  assert.ok(!JSON.stringify(body).includes('"answer"'));
  assert.ok(!JSON.stringify(body).includes('explanation'));
});

await step('second tab: stale revision conflict resyncs', async () => {
  const tab2 = await ctx.newPage();
  await tab2.goto(`${BASE}/test/${first}`);
  await tab2.locator('.palette button').nth(2).click();
  await tab2.locator('.answer-option').first().click();
  await tab2.getByText('3/', { exact: false }).first().waitFor();
  // tab 1 still holds the old revision; answering should conflict, then resync
  await page.locator('.palette button').nth(3).click();
  await page.locator('.answer-option').first().click();
  await page.getByText(/changed in another tab/).waitFor();
  await page.locator('.palette button.answered').nth(2).waitFor();
  await tab2.close();
});

await step('home shows resume banner while test is active', async () => {
  await page.goto(BASE);
  await page.getByRole('link', { name: /Resume practice/ }).waitFor();
  await page.getByRole('link', { name: /Resume practice/ }).click();
  await page.waitForURL(/\/test\//);
});

await step('manual submit via dialog shows result review', async () => {
  await page.getByRole('button', { name: /Submit test/ }).click();
  await shot(page, 'desktop-submit-dialog');
  await page.getByRole('button', { name: 'Submit answers' }).click();
  await page.waitForURL(/\/results\//);
  await page.getByText('YOUR SCORE').waitFor();
  await page.locator('.review-card').first().waitFor();
  await page.getByRole('button', { name: 'हिन्दी' }).click();
  await shot(page, 'desktop-results-hi');
});

await step('timer expiry with answers auto-submits (counts)', async () => {
  await page.goto(`${BASE}/practice?subject=${encodeURIComponent('bpsc-tre-4.0/computer/dbms')}`);
  await page.getByRole('button', { name: /Start test/ }).nth(1).click();
  await page.waitForURL(/\/test\//);
  const id = attemptId();
  await page.locator('.answer-option').first().click();
  await page.getByText('Saved to your session').waitFor();
  await db.collection('attempts').updateOne({ _id: id }, { $set: { endsAt: new Date(Date.now() + 3000) } });
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.waitForURL(/\/results\//, { timeout: 30000 });
  await page.getByText(/Auto-submitted/).waitFor();
});

await step('untouched expiry is abandoned and preserves allowance', async () => {
  await page.goto(`${BASE}/practice?subject=${encodeURIComponent('bpsc-tre-4.0/computer/dbms')}`);
  await page.getByText('1 free attempts remaining', { exact: false }).waitFor();
  await page.getByRole('button', { name: /Start test/ }).nth(2).click();
  await page.waitForURL(/\/test\//);
  const id = attemptId();
  await db.collection('attempts').updateOne({ _id: id }, { $set: { endsAt: new Date(Date.now() - 1000) } });
  await page.goto(`${BASE}/attempts`);
  await page.getByText('Allowance preserved').waitFor();
  await shot(page, 'desktop-history');
  const s = await page.evaluate(async () => (await fetch('/api/session')).json());
  assert.equal(s.remaining, 1);
});

await step('third completion, then fourth start redirects to signup', async () => {
  await page.goto(`${BASE}/practice?subject=${encodeURIComponent('bpsc-tre-4.0/computer/dbms')}`);
  await page.getByRole('button', { name: /Start test/ }).nth(3).click();
  await page.waitForURL(/\/test\//);
  await page.getByRole('button', { name: /Submit test/ }).click();
  await page.getByRole('button', { name: 'Submit answers' }).click();
  await page.waitForURL(/\/results\//);
  await page.goto(`${BASE}/practice?subject=${encodeURIComponent('bpsc-tre-4.0/computer/dbms')}`);
  await page.getByText('0 free attempts remaining', { exact: false }).waitFor();
  await page.getByRole('button', { name: /Start test/ }).nth(4).click();
  await page.waitForURL(/\/auth\?reason=limit/);
  await page.getByText('completed your 3 free sets').waitFor();
  await shot(page, 'desktop-auth-limit');
});

const email = `e2e-${randomUUID().slice(0, 8)}@example.com`; const password = 'correct horse battery';
await step('register continues straight into the blocked set', async () => {
  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Create free account' }).click();
  await page.waitForURL(/\/test\//);
  await page.getByRole('button', { name: /Submit test/ }).click();
  await page.getByRole('button', { name: 'Submit answers' }).click();
  await page.waitForURL(/\/results\//);
});

await step('history includes claimed guest attempts', async () => {
  await page.goto(`${BASE}/attempts`);
  await page.locator('.history-card').nth(4).waitFor();
  assert.equal(await page.locator('.history-card').count(), 5);
  await page.getByText(email).waitFor();
});

await step('logout hides account history', async () => {
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByText('Guest workspace').waitFor();
  await page.goto(`${BASE}/attempts`);
  await page.getByText('Your first attempt starts here.').waitFor();
  const s = await page.evaluate(async () => (await fetch('/api/session')).json());
  assert.equal(s.remaining, 0);
});

await step('wrong password rejected; login works', async () => {
  await page.goto(`${BASE}/auth`);
  await page.locator('#email').fill(email);
  await page.locator('#password').fill('wrong password here');
  await page.getByRole('button', { name: 'Sign in', exact: true }).last().click();
  await page.getByText('Email or password is incorrect.').waitFor();
  await page.locator('#password').fill(password);
  await page.locator('form button.primary').click();
  await page.waitForURL(BASE + '/');
  await page.getByText(email).waitFor();
  await page.goto(`${BASE}/attempts`);
  await page.locator('.history-card').nth(4).waitFor();
});

await step('cross-origin mutation is rejected', async () => {
  const r = await page.request.post(`${BASE}/api/attempts`, { headers: { origin: 'https://evil.example', 'content-type': 'application/json' }, data: { setId: 'x' } });
  assert.equal(r.status(), 403);
});

await step('mobile layouts render without horizontal scroll', async () => {
  const m = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const mp = await m.newPage();
  for (const [path, name] of [['/', 'mobile-library'], ['/auth', 'mobile-auth'], [`/practice?subject=${encodeURIComponent('bpsc-tre-4.0/computer/dbms')}`, 'mobile-subject']]) {
    await mp.goto(BASE + path); await mp.waitForLoadState('networkidle');
    const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 0, `${path} overflows by ${overflow}px`);
    await shot(mp, name);
  }
  await mp.getByRole('button', { name: /Start test/ }).first().click();
  await mp.waitForURL(/\/test\//);
  await mp.getByRole('button', { name: 'हिन्दी' }).click();
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 0, `test page overflows by ${overflow}px`);
  await shot(mp, 'mobile-test-hi');
  await m.close();
});

// 409 (stale tab) and 401 (free limit, wrong password) responses are expected above.
const unexpected = consoleErrors.filter(e => !/status of (401|409)/.test(e));
console.log('unexpected console errors:', unexpected.length ? unexpected : 'none');
if (unexpected.length) process.exitCode = 1;
const user = await db.collection('users').findOne({ email });
if (user) await Promise.all([db.collection('users').deleteOne({ _id: user._id }), db.collection('actors').deleteOne({ _id: user._id }), db.collection('sessions').deleteMany({ actorId: user._id })]);
await browser.close(); await mongo.close();
