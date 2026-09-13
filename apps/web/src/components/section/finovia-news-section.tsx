"use client";

import { Check, ArrowRight, Calendar, Clock } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Mastering Global Treasury Management and Real-Time Settlement",
    category: "Treasury",
    date: "Mar 12, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
    summary:
      "Discover the modern frameworks used by cross-border fintechs to minimize currency slippage and maximize yield.",
  },
  {
    id: "2",
    title: "How Automated Ledgers Eliminate Reconciliation Inefficiencies",
    category: "Fintech",
    date: "Mar 08, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    summary:
      "Say goodbye to manual month-end spreadsheets with automated ledger synchronization across all banking endpoints.",
  },
  {
    id: "3",
    title: "Building an Unbreakable Multi-Currency Risk Defense Architecture",
    category: "Security",
    date: "Feb 28, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    summary:
      "A deep dive into multi-factor cryptographic approvals, behavioral anomaly tracking, and scam prevention.",
  },
];

export function FinoviaNewsSection() {
  return (
    <section id="news" className="py-16 md:py-24 border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Tag Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2fbe8] border border-[#bef264] text-xs font-semibold text-[#1e3d2c]">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#bef264] text-[#0e2118]">
              <Check className="size-2 stroke-[3]" />
            </span>
            <span>News & Blogs</span>
          </div>
        </div>

        {/* Section Heading Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e2118] tracking-tight leading-tight">
              Our Latest News & Blogs
            </h2>
          </div>
          <div>
            <a
              href="#blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition-all"
            >
              <span>See More Blogs</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl bg-white border border-black/[0.06] overflow-hidden shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-48 w-full overflow-hidden bg-zinc-100 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-[#0e2118]">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0e2118] leading-snug group-hover:text-emerald-800 transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-500 font-normal leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-[#0e2118] group-hover:text-emerald-700">
                  <span>Read Article</span>
                  <ArrowRight className="size-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
