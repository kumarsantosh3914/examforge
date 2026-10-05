'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/client';
import type { SessionView } from '@/lib/types';

const Context = createContext<{ session: SessionView | null; error: string; refresh: () => Promise<void> }>({ session: null, error: '', refresh: async () => {} });
let initial: Promise<SessionView> | undefined;
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionView | null>(null);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => { try { setSession(await api<SessionView>('/session')); setError(''); } catch (e) { setError((e as Error).message); } }, []);
  useEffect(() => {
    initial ??= api<SessionView>('/session');
    initial.then(setSession).catch(e => { setError(e.message); initial = undefined; });
  }, []);
  return <Context.Provider value={{ session, error, refresh }}>{children}</Context.Provider>;
}
export const useSession = () => useContext(Context);
