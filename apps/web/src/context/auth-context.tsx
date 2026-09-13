"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  tier: "Free" | "Pro" | "Enterprise";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  demoLogin: (type?: "candidate" | "recruiter") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "finovia_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore storage read errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _password?: string, name?: string) => {
    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name || email.split("@")[0] || "Finovia User",
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      role: "Candidate",
      tier: "Pro",
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Storage fallback
    }
    return true;
  };

  const signup = async (name: string, email: string, _password?: string) => {
    return login(email, _password, name);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const demoLogin = (type: "candidate" | "recruiter" = "candidate") => {
    const demoUser: User =
      type === "candidate"
        ? {
            id: "usr_demo_cand",
            name: "Alex Morgan",
            email: "alex.morgan@fintech.dev",
            avatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
            role: "Senior Software Engineer",
            tier: "Pro",
          }
        : {
            id: "usr_demo_rec",
            name: "Sarah Lin",
            email: "sarah.lin@finovia.io",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
            role: "Talent Acquisition Partner",
            tier: "Enterprise",
          };
    setUser(demoUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
