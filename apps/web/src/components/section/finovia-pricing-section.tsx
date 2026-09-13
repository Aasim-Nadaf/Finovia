"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Gem } from "lucide-react";

export function FinoviaPricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-16 md:py-24 border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e2118] tracking-tight leading-tight mb-3">
            Explore our pricing plans
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
            We help to keep track of your expense and incomes. It shows the flow of
            records over a specific period of time. Such as weekly, monthly or
            yearly.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center bg-black/[0.04] p-1 rounded-full border border-black/[0.06]">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#0e2118] text-white shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-[#0e2118] text-white shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <span>Yearly</span>
              <span className="bg-[#bef264] text-[#0e2118] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Plan 1: Basic Plan */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              {/* Icon */}
              <div className="size-10 rounded-xl bg-[#f2fbe8] border border-[#bef264] flex items-center justify-center text-[#1e3d2c] mb-6">
                <Zap className="size-5 text-emerald-700" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0e2118]">
                  {billingCycle === "monthly" ? "$9.99" : "$7.99"}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  (per month)
                </span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className="w-full mt-4 mb-4 py-3 rounded-full text-xs font-semibold border border-black/[0.1] text-[#0e2118] hover:bg-zinc-50 transition cursor-pointer"
              >
                Get Started
              </button>

              <p className="text-[11px] text-zinc-400 font-normal mb-6">
                Additional information can be added here
              </p>

              {/* What's included */}
              <div className="space-y-3 pt-6 border-t border-zinc-100">
                <span className="text-xs font-semibold text-[#0e2118] block mb-2">
                  What&apos;s included:
                </span>
                {[
                  "Expense Tracking",
                  "Income Management",
                  "Basic Financial Reports",
                  "Budgeting Tools",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-zinc-600">
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#f2fbe8] text-emerald-700 shrink-0">
                      <Check className="size-2.5 stroke-[2.5]" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan 2: Standard Plan (Most Popular / Dark Featured Card) */}
          <div className="rounded-3xl bg-[#0e2118] text-white p-7 sm:p-8 border border-white/10 shadow-[0_20px_50px_rgba(14,33,24,0.3)] flex flex-col justify-between relative transition-transform hover:-translate-y-1">
            {/* Most Popular Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-[#bef264] text-[#0e2118] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                Most Popular
              </span>
            </div>

            <div>
              {/* Icon */}
              <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-[#bef264] mb-6">
                <Sparkles className="size-5" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  {billingCycle === "monthly" ? "$19.99" : "$15.99"}
                </span>
                <span className="text-xs text-zinc-300 font-medium">
                  (per month)
                </span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className="w-full mt-4 mb-4 py-3 rounded-full text-xs font-bold bg-[#bef264] text-[#0e2118] hover:bg-[#a3e635] transition shadow-md cursor-pointer"
              >
                Get Started
              </button>

              <p className="text-[11px] text-zinc-300 font-normal mb-6">
                Additional information can be added here
              </p>

              {/* What's included */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <span className="text-xs font-semibold text-white block mb-2">
                  What&apos;s included:
                </span>
                {[
                  "Everything in Basic Plan",
                  "Cash Flow Management",
                  "Advanced Financial Reports",
                  "Tax Calculation & Support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118] shrink-0">
                      <Check className="size-2.5 stroke-[3]" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan 3: Premium Plan */}
          <div className="rounded-3xl bg-white p-7 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              {/* Icon */}
              <div className="size-10 rounded-xl bg-[#f2fbe8] border border-[#bef264] flex items-center justify-center text-[#1e3d2c] mb-6">
                <Gem className="size-5 text-emerald-700" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0e2118]">
                  {billingCycle === "monthly" ? "$29.99" : "$23.99"}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  (per month)
                </span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className="w-full mt-4 mb-4 py-3 rounded-full text-xs font-semibold border border-black/[0.1] text-[#0e2118] hover:bg-zinc-50 transition cursor-pointer"
              >
                Get Started
              </button>

              <p className="text-[11px] text-zinc-400 font-normal mb-6">
                Additional information can be added here
              </p>

              {/* What's included */}
              <div className="space-y-3 pt-6 border-t border-zinc-100">
                <span className="text-xs font-semibold text-[#0e2118] block mb-2">
                  What&apos;s included:
                </span>
                {[
                  "Everything in Standard Plan",
                  "Inventory Management",
                  "Payroll Management",
                  "Custom Financial Reports",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-zinc-600">
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#f2fbe8] text-emerald-700 shrink-0">
                      <Check className="size-2.5 stroke-[2.5]" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
