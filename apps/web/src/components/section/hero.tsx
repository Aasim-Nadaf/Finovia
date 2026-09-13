"use client";

import { Check, ArrowUpRight, Play, MoreVertical, CreditCard, Wifi } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-6 pb-20 md:pt-12 md:pb-32 overflow-hidden">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 -z-10 h-[650px] w-full max-w-[900px] opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(190, 242, 100, 0.45) 0%, rgba(220, 252, 160, 0.25) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-semibold text-[#1e3d2c] shadow-xs">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
              <Check className="size-2.5 stroke-[3]" />
            </span>
            <span>Faster Global Payments</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0e2118] leading-[1.12]">
            Empowering You to Achieve <br className="hidden sm:inline" />
            Financial Freedom
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            Perfect for fintech or consumer finance platforms aiming to simplify
            complex financial tasks for everyday users.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 mb-16">
          <a
            href="#analyzer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-md transition-all group"
          >
            <span>Analyze Resume Now</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white border border-black/[0.08] text-[#0e2118] hover:bg-zinc-50 shadow-xs transition-all cursor-pointer"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-zinc-100 text-[#0e2118]">
              <Play className="size-2.5 fill-current ml-0.5" />
            </span>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Hero Dashboard Preview Showcase */}
        <div className="relative mx-auto max-w-5xl">
          {/* Subtle container frame with gentle background */}
          <div className="relative rounded-3xl p-4 sm:p-8 bg-black/[0.02] border border-black/[0.06] backdrop-blur-xs">
            {/* Top Grid Row of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Card 1: Spending Limits (Left) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-5 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#0e2118]">Spending Limits</h3>
                  <button type="button" className="text-zinc-400 hover:text-zinc-700">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
                {/* Dual progress bar */}
                <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden flex mb-3">
                  <div className="h-full w-[80%] bg-[#bef264] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500 font-normal">
                    <strong className="text-[#0e2118] font-semibold">$8,690.00</strong> spent of $10,000.00
                  </span>
                  <span className="text-zinc-700 font-semibold">20%</span>
                </div>
              </div>

              {/* Card 2: Income Card (Center) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-5 border border-black/[0.06] shadow-[0_12px_35px_rgb(0,0,0,0.06)] relative -translate-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-500">Income</span>
                  <span className="size-6 rounded-full bg-[#bef264] flex items-center justify-center text-[#0e2118]">
                    <Check className="size-3.5 stroke-[2.5]" />
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0e2118] mb-4">
                  $8,682.00
                </div>
                {/* Account Number Pill */}
                <div className="flex items-center gap-2.5 rounded-xl bg-[#0e2118] text-white p-2.5 shadow-xs">
                  <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <CreditCard className="size-4 text-[#bef264]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase font-medium tracking-wider text-zinc-400">
                      Account Number
                    </div>
                    <div className="text-xs font-mono font-medium text-zinc-100">
                      **** **** 6374
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Receiver Card (Right) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-5 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500">Receiver</span>
                  <span className="size-6 rounded-full bg-[#bef264] flex items-center justify-center text-[#0e2118]">
                    <Check className="size-3.5 stroke-[2.5]" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-linear-to-tr from-[#bef264] to-emerald-400 p-0.5 shrink-0 shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                      alt="Receiver avatar"
                      className="size-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0e2118]">Sajibur Rahman</h4>
                    <p className="text-xs text-zinc-500 font-mono">+8801701076703</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Grid Row of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 items-stretch">
              {/* Card 4: Finance Overview (Left) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-5 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#0e2118]">Finance Overview</h3>
                    <button type="button" className="text-zinc-400 hover:text-zinc-700">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                  {/* Legend dots */}
                  <div className="flex items-center gap-3 text-xs text-zinc-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[#0e2118]" /> Total
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[#bef264]" /> Today
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-zinc-300" /> This Week
                    </span>
                  </div>
                </div>
                {/* Mini bar comparison visualization */}
                <div className="flex items-end gap-2 h-16 pt-2">
                  <div className="flex-1 bg-[#0e2118] h-[80%] rounded-t-sm" />
                  <div className="flex-1 bg-[#bef264] h-[95%] rounded-t-sm" />
                  <div className="flex-1 bg-zinc-200 h-[60%] rounded-t-sm" />
                  <div className="flex-1 bg-[#0e2118] h-[70%] rounded-t-sm" />
                  <div className="flex-1 bg-[#bef264] h-[85%] rounded-t-sm" />
                  <div className="flex-1 bg-zinc-200 h-[50%] rounded-t-sm" />
                </div>
              </div>

              {/* Card 5: Payment Cards - Vibrant Lime VISA (Center) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-4 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-sm font-semibold text-[#0e2118]">Payment Cards</h3>
                </div>
                {/* VISA Card Mockup */}
                <div className="rounded-xl p-4 bg-linear-to-tr from-[#a3e635] via-[#bef264] to-[#d9f99d] text-[#0e2118] shadow-md relative overflow-hidden border border-lime-300/60">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-black tracking-wider italic font-sans">
                      VISA
                    </span>
                    <Wifi className="size-4 rotate-90 opacity-70" />
                  </div>
                  {/* EMV Chip & Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-5 rounded-xs bg-amber-200/90 border border-amber-400/50 shadow-inner" />
                    <span className="text-xs font-mono font-bold tracking-widest text-[#0e2118]/80">
                      •••• 8291
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-[#0e2118]/75">
                    <span>FINOVIA PLATINUM</span>
                    <span>09 / 28</span>
                  </div>
                </div>
              </div>

              {/* Card 6: Spending Limits / Contacts (Right) */}
              <div className="md:col-span-4 rounded-2xl bg-white p-5 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#0e2118]">Spending Limits</h3>
                    <button type="button" className="text-zinc-400 hover:text-zinc-700">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">Main balance activity</p>
                  {/* Avatar stack and activity */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img
                        className="inline-block size-7 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="User"
                      />
                      <img
                        className="inline-block size-7 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt="User"
                      />
                      <img
                        className="inline-block size-7 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                        alt="User"
                      />
                    </div>
                    <span className="text-xs font-semibold text-zinc-700">+12 recent</span>
                  </div>
                </div>
                {/* Mini indicator */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Security checks</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="size-3 stroke-[3]" /> Passed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

