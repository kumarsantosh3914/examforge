import assert from 'node:assert/strict';
import test from 'node:test';
import { credentialsSchema, hashPassword, verifyPassword } from '../src/lib/security';

test('password hashing uses a unique salt and verifies without storing plaintext', async () => {
  const password = 'a secure practice passphrase';
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.ok(!first.includes(password));
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword('wrong password', first), false);
});

test('authentication validation normalizes email and rejects weak input', () => {
  const value = credentialsSchema.parse({ email: ' Student@Example.COM ', password: 'ten-letters+' });
  assert.equal(value.email, 'student@example.com');
  assert.equal(credentialsSchema.safeParse({ email: 'bad', password: 'short' }).success, false);
  assert.equal(credentialsSchema.safeParse({ email: 'ok@example.com', password: 'ten-letters+', extra: true }).success, false);
});
