"use client";

import { useState } from "react";
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  icon: typeof FileText;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: "revenue-tracking",
    title: "Real-Time Revenue Tracking",
    icon: TrendingUp,
    description:
      "Monitor cashflow surges and customer payment velocity with zero-latency ledger updates synchronized across global accounts.",
  },
  {
    id: "automated-reports",
    title: "Automated Financial Reports Delivery",
    icon: FileText,
    description:
      "Receive detailed financial reports automatically—no manual work required. Stay updated with timely insights tailored to your business.",
  },
  {
    id: "performance-pulse",
    title: "Visual Business Performance Pulse",
    icon: Activity,
    description:
      "Interactive health metrics and predictive forecasts that highlight revenue opportunities and burn-rate shifts before month-end.",
  },
  {
    id: "tool-integration",
    title: "Secure Finance Tool Integration",
    icon: ShieldCheck,
    description:
      "Connect seamlessly with your existing accounting tools, ERPs, and banking rails through end-to-end encrypted protocol channels.",
  },
];

export function PlatformOverviewSection() {
  const [activeId, setActiveId] = useState<string>("automated-reports");
  const [timeframe, setTimeframe] = useState<string>("Last Week");

  return (
    <section id="services" className="py-16 md:py-24 border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Tag Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-semibold text-[#1e3d2c]">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
              <Check className="size-2 stroke-[3]" />
            </span>
            <span>Platform Overview</span>
          </div>
        </div>

        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e2118] tracking-tight leading-tight">
              Empowering You to Achieve <br className="hidden sm:inline" />
              Financial Freedom
            </h2>
          </div>
          <div>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Accordion */}
          <div className="lg:col-span-6 space-y-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isExpanded = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isExpanded
                      ? "bg-[#0e2118] text-white border-black/10 shadow-lg"
                      : "bg-white text-[#0e2118] border-black/[0.06] hover:border-black/[0.12] shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(isExpanded ? "" : item.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isExpanded
                            ? "bg-white/10 text-[#bef264]"
                            : "bg-black/[0.04] text-[#0e2118]"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <span
                        className={`text-sm sm:text-base font-semibold ${
                          isExpanded ? "text-white" : "text-[#0e2118]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="size-4 text-zinc-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed pl-11">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Revenue Overview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white border border-black/[0.06] p-6 sm:p-8 shadow-[0_16px_50px_rgb(0,0,0,0.06)] relative overflow-hidden">
              {/* Header with dropdown */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-[#0e2118]">
                  Revenue Overview
                </h3>
                <div className="relative">
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="appearance-none bg-black/[0.03] border border-black/[0.08] text-xs font-medium text-zinc-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-hidden"
                  >
                    <option value="Last Week">Last Week</option>
                    <option value="This Month">This Month</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-zinc-500" />
                </div>
              </div>

              {/* Amount & Subtitle */}
              <div className="mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0e2118]">
                  $9,679.00
                </div>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  Our most recent marketing profit.
                </p>
              </div>

              {/* 3D Cylinder Bar Visualization */}
              <div className="relative h-56 w-full flex items-end justify-between px-4 pb-2 pt-6">
                {/* Ambient glow under cylinders */}
                <div
                  className="absolute bottom-0 inset-x-8 h-12 rounded-full blur-xl -z-10 opacity-70"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(190, 242, 100, 0.6), transparent 70%)",
                  }}
                />

                {/* 3D Cylinder Bars */}
                {[
                  { height: "45%", label: "Mon", topShade: "#d9f99d", bodyGrad: "from-[#a3e635] via-[#84cc16] to-[#4d7c0f]" },
                  { height: "60%", label: "Tue", topShade: "#bef264", bodyGrad: "from-[#bef264] via-[#84cc16] to-[#3f6212]" },
                  { height: "80%", label: "Wed", topShade: "#d9f99d", bodyGrad: "from-[#a3e635] via-[#65a30d] to-[#365314]" },
                  { height: "100%", label: "Thu", topShade: "#bef264", bodyGrad: "from-[#bef264] via-[#84cc16] to-[#1e3a2b]" },
                ].map((col) => (
                  <div key={col.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                      className="relative w-14 sm:w-16 transition-all duration-300 group-hover:scale-105"
                      style={{ height: col.height }}
                    >
                      {/* Top ellipse cap for 3D effect */}
                      <div
                        className="absolute -top-3 inset-x-0 h-6 rounded-[50%] z-20 border border-white/60 shadow-xs"
                        style={{
                          background: `radial-gradient(circle at 45% 45%, #ffffff 0%, ${col.topShade} 70%, #84cc16 100%)`,
                        }}
                      />
                      {/* Main cylinder body with 3D cylindrical lighting */}
                      <div
                        className="size-full rounded-b-xl relative overflow-hidden shadow-md"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(190,242,100,0.95) 25%, #84cc16 65%, #3f6212 100%)",
                        }}
                      >
                        {/* Highlights & gloss reflection overlay */}
                        <div className="absolute left-2 inset-y-0 w-1.5 bg-white/40 blur-[1px]" />
                        <div className="absolute right-0 inset-y-0 w-3 bg-black/15" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Card: Total Expenses */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#0e2118]">
                    Total Expenses
                  </span>
                  {/* Multi-color segmented bar */}
                  <div className="mt-1.5 flex h-2 w-32 sm:w-44 rounded-full overflow-hidden gap-0.5">
                    <div className="w-[30%] bg-purple-500 rounded-l-full" />
                    <div className="w-[35%] bg-amber-400" />
                    <div className="w-[35%] bg-[#bef264] rounded-r-full" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-bold text-[#1f4e34]">
                  <span>↗</span>
                  <span>40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
