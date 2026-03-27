import { createContext } from "react";

export interface AuthContextType {
  user: { id: string | number; email: string; full_name: string; role: string;[key: string]: unknown } | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
