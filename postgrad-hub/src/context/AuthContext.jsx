import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth, SessionInvalidatedError } from '../lib/db.js';

const AuthCtx = createContext(null);
const KICKED_KEY = 'pgh_kicked_flag';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Set to true when THIS browser was force-signed-out by another device
  // signing in as this user. The Login page can read it and show a banner.
  const [sessionKicked, setSessionKicked] = useState(
    () => { try { return localStorage.getItem(KICKED_KEY) === '1'; } catch { return false; } }
  );

  const flagKicked = () => {
    try { localStorage.setItem(KICKED_KEY, '1'); } catch {}
    setSessionKicked(true);
  };
  const clearKicked = () => {
    try { localStorage.removeItem(KICKED_KEY); } catch {}
    setSessionKicked(false);
  };

  const refresh = useCallback(async () => {
    try {
      const u = await auth.current();
      setUser(u);
    } catch (err) {
      if (err && err.code === 'SESSION_INVALIDATED') {
        // Another device signed in as this user; force local logout + show banner
        flagKicked();
        setUser(null);
      } else {
        setUser(null);
      }
    }
  }, []);

  // Poll for session validity every 30 s while the tab is open, so that
  // if another device signs in, this browser learns within ~30 s and kicks out.
  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
    const iv = setInterval(refresh, 30000);
    // Also re-check when the tab regains focus (user comes back after a while)
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    return () => { clearInterval(iv); window.removeEventListener('focus', onFocus); };
  }, [refresh]);

  const value = {
    user,
    loading,
    refresh,
    sessionKicked,
    clearKicked,
    async login(creds) {
      clearKicked();
      const u = await auth.login(creds);
      localStorage.setItem('pgh_last_email', creds.email);
      await refresh();
      return u;
    },
    async register(data) {
      clearKicked();
      const u = await auth.register(data);
      localStorage.setItem('pgh_last_email', data.email);
      await refresh();
      return u;
    },
    async logout() {
      await auth.logout();
      clearKicked();
      setUser(null);
    },
    async updateProfile(updates) {
      await auth.updateProfile(updates);
      await refresh();
    },
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
