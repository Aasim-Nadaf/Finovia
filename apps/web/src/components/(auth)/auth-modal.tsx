"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { X, Check, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const { login, signup, demoLogin } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(name || email.split("@")[0] || "User", email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDemoCandidate = () => {
    demoLogin("candidate");
    onClose();
  };

  const handleDemoRecruiter = () => {
    demoLogin("recruiter");
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/[0.08] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-black hover:bg-black/[0.04] transition-colors"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {/* Brand & Heading */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-[11px] font-semibold text-[#1e3d2c] mb-3">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
              <Check className="size-2 stroke-[3]" />
            </span>
            <span>Finovia Security & ATS Cloud</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#0e2118] tracking-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h3>
          <p className="text-xs text-zinc-500 font-normal mt-1">
            {mode === "login"
              ? "Sign in to access your analyzed resumes and ATS reports."
              : "Sign up to parse resumes, review flaw audits, and track scores."}
          </p>
        </div>

        {/* One-Click Quick Demo Buttons for Instant Testing */}
        <div className="mb-5 p-3 rounded-2xl bg-[#0e2118]/[0.03] border border-black/[0.06]">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
            ⚡ Quick Test / Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCandidate}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-black/[0.08] text-[#0e2118] hover:border-[#0e2118] transition shadow-2xs"
            >
              <UserCheck className="size-3.5 text-emerald-700" />
              <span>Alex (Candidate)</span>
            </button>
            <button
              type="button"
              onClick={handleDemoRecruiter}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-black/[0.08] text-[#0e2118] hover:border-[#0e2118] transition shadow-2xs"
            >
              <ShieldCheck className="size-3.5 text-emerald-700" />
              <span>Sarah (Recruiter)</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <span className="absolute inset-x-0 h-px bg-black/[0.06]" />
          <span className="relative bg-white px-3 text-[11px] font-medium text-zinc-400">
            or sign in with email
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118] focus:ring-1 focus:ring-[#0e2118]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.morgan@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118] focus:ring-1 focus:ring-[#0e2118]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-zinc-700">
                Password
              </label>
              {mode === "login" && (
                <a href="#" className="text-[11px] text-zinc-400 hover:text-black">
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118] focus:ring-1 focus:ring-[#0e2118]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-5 text-center text-xs text-zinc-500">
          {mode === "login" ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-semibold text-[#0e2118] hover:underline"
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-[#0e2118] hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
