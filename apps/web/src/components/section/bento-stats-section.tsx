"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";

export function BentoStatsSection() {
  return (
    <section id="features" className="py-16 md:py-24 border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-14">
          {/* Card 1: Lime Card (Left, 4 cols) */}
          <div className="md:col-span-4 rounded-3xl bg-[#d9f99d] p-6 sm:p-7 flex flex-col justify-between border border-[#bef264] shadow-sm relative overflow-hidden">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1e3d2c] mb-3">
                Precision & Growth
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0e2118] tracking-tight leading-tight">
                Empowering Your Wealth with Precision.
              </h3>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0e2118]/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-[#d9f99d] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-[#d9f99d] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-[#d9f99d] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <div className="size-8 rounded-full bg-[#0e2118] text-[#bef264] text-[11px] font-bold flex items-center justify-center ring-2 ring-[#d9f99d]">
                    +5
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-[#1e3d2c] mb-1">
                Daily New Clients
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-[#0e2118]">100</span>
                <span className="inline-flex items-center text-xs font-bold text-[#0e2118] bg-[#bef264] px-2 py-0.5 rounded-full border border-lime-400">
                  +36%
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Center Column - Sales Analysis + Personal Finance Toolkit (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Sales Analysis Card */}
            <div className="rounded-3xl bg-white p-6 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-500">Sales Analysis</span>
                <span className="text-xs font-mono text-zinc-400">March 2026</span>
              </div>
              <div className="text-3xl font-extrabold text-[#0e2118] mb-4">
                $35,600
              </div>

              {/* Monthly Bars */}
              <div className="flex items-end justify-between h-20 pt-2 gap-2">
                {[
                  { month: "Jan", height: "45%", color: "bg-zinc-200" },
                  { month: "Feb", height: "65%", color: "bg-zinc-200" },
                  { month: "Mar", height: "95%", color: "bg-[#bef264]" },
                  { month: "Apr", height: "75%", color: "bg-[#0e2118]" },
                ].map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className={`w-full rounded-t-sm ${item.color}`}
                      style={{ height: item.height }}
                    />
                    <span className="text-[10px] font-medium text-zinc-500">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Finance Toolkit (Dark Subcard) */}
            <div className="rounded-3xl bg-[#0e2118] text-white p-5 border border-white/10 shadow-md relative overflow-hidden flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white mb-1">
                  Your Personal Finance Toolkit
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-2">
                  We provide tools to simplify your financial decisions.
                </p>
              </div>
              {/* 3D Colorful Torus/Geometric illustration */}
              <div className="size-14 rounded-2xl bg-linear-to-tr from-purple-500 via-pink-500 to-[#bef264] p-0.5 shrink-0 shadow-md animate-pulse">
                <div className="size-full rounded-2xl bg-[#0e2118] flex items-center justify-center p-2">
                  <div className="size-7 rounded-full border-4 border-t-pink-500 border-r-[#bef264] border-b-purple-500 border-l-cyan-400 rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Right Column - Users Around The World + Fraud Protection + Secure Plan (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Top Dark Card: 100K Users */}
            <div className="rounded-3xl bg-[#0e2118] text-white p-6 border border-white/10 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-3xl font-black text-white">
                    <span>100K</span>
                    <span className="text-sm text-[#bef264]">▲</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5">Users around the world</p>
                </div>
                {/* Mini Card Graphic with Chip */}
                <div className="w-12 h-8 rounded-md bg-[#163628] border border-white/20 p-1.5 flex flex-col justify-between shadow-xs">
                  <div className="size-2 rounded-xs bg-amber-400" />
                  <div className="w-5 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Sales Analysis</span>
                <span className="text-[#bef264] font-semibold">Active</span>
              </div>
            </div>

            {/* Bottom 2 mini cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {/* $100M Protection */}
              <div className="rounded-3xl bg-white p-5 border border-black/[0.06] shadow-xs flex flex-col justify-between">
                <div className="size-8 rounded-xl bg-[#f2fbe8] border border-[#bef264] flex items-center justify-center text-[#1e3d2c] mb-3">
                  <ShieldCheck className="size-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#0e2118]">$100M</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Fraud & Scam Protection</div>
                </div>
              </div>

              {/* Building 100% Plan */}
              <div className="rounded-3xl bg-white p-5 border border-black/[0.06] shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0e2118] mb-1">
                    Building a 100% Secure Financial Plan
                  </h4>
                  <p className="text-[10px] text-zinc-500 line-clamp-2">
                    A step-by-step guide to creating a bulletproof roadmap.
                  </p>
                </div>
                <a
                  href="#read-more"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0e2118] hover:text-emerald-700 mt-2"
                >
                  <span>Read more</span>
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="rounded-2xl bg-white border border-black/[0.06] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
            {[
              { stat: "50%", label: "Client Acquisition" },
              { stat: "65%", label: "Sales Revenue" },
              { stat: "45%", label: "Improved Security" },
              { stat: "70%", label: "Toolkit Engagement" },
            ].map((item, idx) => (
              <div key={item.label} className={`flex flex-col ${idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}>
                <div className="flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-[#0e2118]">
                  <span className="text-base text-zinc-500 font-normal">↑</span>
                  <span>{item.stat}</span>
                </div>
                <div className="text-xs font-medium text-zinc-500 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
