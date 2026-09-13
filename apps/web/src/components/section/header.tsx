"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/section/logo";
import { useScroll } from "@/components/section/use-scroll";
import { ChevronDown, Menu, X, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export const navItems = [
  { label: "Home", href: "#", active: true },
  { label: "ATS Analyzer", href: "#analyzer", highlight: true },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const navLinks = navItems;

export function Header() {
  const scrolled = useScroll(10);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header
        id="finovia-header"
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "bg-[#f8faf7]/90 backdrop-blur-md border-b border-black/[0.06] py-3 shadow-xs"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo />
          </a>

          {/* Center Floating Navigation Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center bg-black/[0.04] border border-black/[0.07] p-1 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
          >
            {navItems.map((item) =>
              item.highlight ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="bg-[#0e2118] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:bg-[#163628] transition-all"
                >
                  <Sparkles className="size-3 text-[#bef264]" />
                  <span>{item.label}</span>
                </a>
              ) : item.active ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0e2118] transition-all"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#0e2118]/70 hover:text-[#0e2118] transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="size-3 opacity-60" />}
                </a>
              )
            )}
          </nav>

          {/* Right Actions / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-2xs">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="size-6 rounded-full object-cover ring-1 ring-black/10"
                    />
                  ) : (
                    <div className="size-6 rounded-full bg-[#bef264] text-[#0e2118] font-bold text-xs flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <span className="block text-xs font-bold text-[#0e2118] leading-tight">
                      {user.name}
                    </span>
                    <span className="block text-[10px] text-zinc-400 font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-full text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Sign Out"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-xs font-semibold text-[#0e2118] hover:text-black transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-black/[0.04] text-[#0e2118]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-black/[0.06] bg-[#f8faf7] px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between",
                    item.highlight
                      ? "bg-[#0e2118] text-white"
                      : "text-[#0e2118]/80 hover:bg-black/[0.04]"
                  )}
                >
                  <span>{item.label}</span>
                  {item.highlight && <Sparkles className="size-3.5 text-[#bef264]" />}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-black/[0.06]">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="size-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#0e2118]">{user.name}</p>
                      <p className="text-xs text-zinc-400">{user.role}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-rose-600 p-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-semibold text-[#0e2118] hover:bg-black/[0.04] rounded-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full text-sm font-semibold bg-[#0e2118] text-white hover:bg-[#163628]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}


