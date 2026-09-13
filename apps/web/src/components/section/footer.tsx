import { Logo } from "@/components/section/logo";

const productLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Platform Services", href: "#services" },
  { label: "Pricing Plans", href: "#pricing" },
  { label: "Client Testimonials", href: "#testimonials" },
  { label: "News & Insights", href: "#news" },
] as const;

const resourceLinks = [
  { label: "Help & Documentation", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Security & Trust", href: "#" },
  { label: "Treasury Guide", href: "#" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Compliance & FDIC", href: "#" },
] as const;

export function Footer() {
  return (
    <footer id="finovia-footer" className="border-t border-black/[0.06] bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/[0.06]">
          {/* Brand and Description */}
          <div className="md:col-span-4 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed max-w-sm">
              Empowering individuals and modern enterprises to achieve financial
              freedom through faster global payments, real-time analytics, and
              automated reporting.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-[11px] font-semibold text-[#1e3d2c]">
              <span>● System operational • 99.99% uptime</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0e2118] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-[#0e2118] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0e2118] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-[#0e2118] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0e2118] mb-4">
              Compliance
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-[#0e2118] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Finovia Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#0e2118] transition-colors">
              Privacy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#0e2118] transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-[#0e2118] transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

