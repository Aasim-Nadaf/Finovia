import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Finovia — Financial Freedom & Smart Fintech Platform",
  description:
    "Finovia — Financial Freedom & Smart Fintech Platform for real-time revenue tracking, spending limits, automated financial reports, and wealth management.",
  openGraph: {
    title: "Finovia — Financial Freedom & Smart Fintech Platform",
    description:
      "Finovia — Financial Freedom & Smart Fintech Platform for real-time revenue tracking, spending limits, automated financial reports, and wealth management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
