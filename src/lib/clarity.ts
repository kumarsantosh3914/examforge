// Microsoft Clarity custom events and tags. Safe to call anywhere: it does nothing until the Clarity tag has loaded.
type Clarity = (...args: unknown[]) => void;
const call = (...args: unknown[]) => { try { (window as unknown as { clarity?: Clarity }).clarity?.(...args); } catch { /* analytics must never break the page */ } };
// Events show up as filters in Clarity (recordings, funnels). Keep names stable.
export const clarityEvent = (name: string) => call('event', name);
// Tags describe the session or page (for example exam or user_type) so recordings can be filtered by them.
export const clarityTag = (key: string, value: string) => call('set', key, value);
