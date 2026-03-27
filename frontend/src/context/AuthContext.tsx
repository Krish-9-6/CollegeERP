import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import api, { setAccessToken } from "../api/axiosInstance";
import { AuthContext } from './AuthContextCreate';

export function Authprovider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasRestoredSession = useRef(false);

  useEffect(() => {
    // Guard against StrictMode running effects twice
    if (hasRestoredSession.current) return;
    hasRestoredSession.current = true;

    const restoreSession = async () => {
      try {
        const { data } = await api.post("/auth/refresh");
        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch {
        setUser(null); // no valid session, user must log in
      } finally {
        setLoading(false); // done checking, app can now render
      }
    };
    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout"); // tells server to invalidate refresh token
    } finally {
      setAccessToken(null);
      setUser(null); // clear state regardless of server response
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user, // { id, email, full_name } or null
        loading, // true while restoring session on startup
        isAuthenticated: user !== null, // convenient boolean
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
