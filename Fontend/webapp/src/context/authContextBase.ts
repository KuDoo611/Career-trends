import { createContext } from "react";
import type { User } from "../model/UserModel";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

// This file intentionally only exports the context (no components) so React Fast Refresh works correctly.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
