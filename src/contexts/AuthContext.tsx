import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { demoAccounts, Role, User } from "@/lib/mockData";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string; user?: User }>;
  signup: (data: { name: string; email: string; password: string; role: Role; company: string }) => Promise<{ ok: boolean; user?: User }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "mf_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login: AuthContextValue["login"] = async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const match = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
    if (!match) return { ok: false, message: "Invalid credentials. Try a demo account." };
    setUser(match.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
    return { ok: true, user: match.user };
  };

  const signup: AuthContextValue["signup"] = async ({ name, email, role, company }) => {
    await new Promise((r) => setTimeout(r, 600));
    const newUser: User = {
      id: "U-" + Math.floor(Math.random() * 10000),
      name,
      email,
      role,
      company,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { ok: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
