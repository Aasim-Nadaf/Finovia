import { LoginForm } from "@/components/(auth)/signin-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg-[#f8faf7] p-4 sm:p-6 md:p-10 overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-full max-w-[800px] opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(190, 242, 100, 0.45) 0%, rgba(220, 252, 160, 0.2) 50%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-4xl mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e2118]/70 hover:text-[#0e2118] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs text-zinc-400">Finovia ATS Intelligence</span>
      </div>

      <div className="w-full max-w-4xl">
        <LoginForm />
      </div>
    </main>
  );
}
