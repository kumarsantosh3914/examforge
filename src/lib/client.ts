export class ApiError extends Error {
  constructor(message: string, public code: string, public status: number) { super(message); }
}
export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`/api${url}`, { ...init, credentials: 'same-origin', cache: 'no-store', headers: { 'Content-Type': 'application/json', ...init?.headers }, signal: init?.signal ?? AbortSignal.timeout(20000) }); }
  catch { throw new ApiError('Connection lost. Check your internet connection and try again.', 'NETWORK', 0); }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(data?.error || 'Something went wrong. Please try again.', data?.code || 'UNKNOWN', response.status);
  return data as T;
}
export const post = (body?: unknown): RequestInit => ({ method: 'POST', body: JSON.stringify(body ?? {}) });
