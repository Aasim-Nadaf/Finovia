"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/section/logo";
import { Check, ArrowRight, UserCheck, ShieldCheck, Sparkles } from "lucide-react";

export function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      setSuccess("Authenticated successfully! Redirecting...");
      setTimeout(() => {
        router.push("/#analyzer");
      }, 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  const handleDemoCandidate = async () => {
    setError(null);
    setLoading(true);
    try {
      await demoLogin("candidate");
      setSuccess("Logged in as Alex Morgan (Candidate)! Redirecting...");
      setTimeout(() => {
        router.push("/#analyzer");
      }, 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load demo profile.");
      setLoading(false);
    }
  };

  const handleDemoRecruiter = async () => {
    setError(null);
    setLoading(true);
    try {
      await demoLogin("recruiter");
      setSuccess("Logged in as Sarah Lin (Recruiter)! Redirecting...");
      setTimeout(() => {
        router.push("/#analyzer");
      }, 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load demo profile.");
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className || ""}`}>
      <div className="overflow-hidden rounded-3xl bg-white border border-black/[0.08] shadow-2xl grid md:grid-cols-12">
        {/* Left Form Panel */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-6">
              <Link href="/" className="inline-block mb-4">
                <Logo />
              </Link>
              <h2 className="text-2xl font-extrabold text-[#0e2118] tracking-tight">
                Welcome back to Finovia
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Log in to review saved resumes, track ATS scores, and access AI career insights.
              </p>
            </div>

            {/* Quick Demo Logins */}
            <div className="mb-5 p-3 rounded-2xl bg-[#0e2118]/[0.03] border border-black/[0.06]">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                ⚡ Instant Demo Login
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoCandidate}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-black/[0.08] text-[#0e2118] hover:border-[#0e2118] transition shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <UserCheck className="size-3.5 text-emerald-700" />
                  <span>Alex (Candidate)</span>
                </button>
                <button
                  type="button"
                  onClick={handleDemoRecruiter}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-black/[0.08] text-[#0e2118] hover:border-[#0e2118] transition shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="size-3.5 text-emerald-700" />
                  <span>Sarah (Recruiter)</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-zinc-700">
                    Password
                  </label>
                  <a href="#" className="text-[11px] text-zinc-400 hover:text-black">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-white text-xs text-[#0e2118] placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0e2118]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? "Signing in..." : "Sign In to Account"}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-semibold text-[#0e2118] hover:underline">
                Sign up free
              </Link>
            </span>
            <Link href="/" className="text-zinc-400 hover:text-black">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Right Finovia Showcase Banner */}
        <div className="hidden md:flex md:col-span-5 bg-[#0e2118] text-white p-8 flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #bef264, transparent 70%)",
            }}
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-[#bef264]">
              <Sparkles className="size-3" />
              <span>AI ATS Evaluation</span>
            </div>

            <h3 className="text-xl font-bold leading-snug">
              Benchmark your resume against top ATS algorithms.
            </h3>

            <div className="space-y-3 pt-2">
              {[
                "Instant ATS compatibility scores (0-100)",
                "Actionable line-by-line bullet rewrites",
                "Keyword gap & job description matcher",
                "Zero fluff, recruiter-approved formats",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
                    <Check className="size-2.5 stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-xs text-zinc-300">
            <p className="italic mb-2">
              &ldquo;Finovia helped me identify 3 critical formatting flaws that were blocking my resume from getting past screening.&rdquo;
            </p>
            <span className="text-[11px] font-bold text-white block">
              Alex Morgan • Hired as Lead Engineer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
