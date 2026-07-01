import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../lib/db.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const u = await auth.current();
    setUser(u);
  }, []);

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const value = {
    user,
    loading,
    refresh,
    async login(creds) {
      const u = await auth.login(creds);
      localStorage.setItem('pgh_last_email', creds.email);
      await refresh();
      return u;
    },
    async register(data) {
      const u = await auth.register(data);
      localStorage.setItem('pgh_last_email', data.email);
      await refresh();
      return u;
    },
    async logout() {
      await auth.logout();
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
