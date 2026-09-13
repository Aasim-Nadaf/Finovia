"use client";

import { Check, ArrowRight, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Carter",
    role: "Web Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "Personalized service, highly professional and trustworthy team, makes banking a pleasure.professional and trustworthy team, makes banking a pleasure.",
  },
  {
    id: "2",
    name: "David Thompson",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "Personalized service, highly professional and trustworthy team, makes banking a pleasure.professional and trustworthy team, makes banking a pleasure.",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    role: "Financial Analyst",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    content:
      "Personalized service, highly professional and trustworthy team, makes banking a pleasure.professional and trustworthy team, makes banking a pleasure.",
  },
];

export function FinoviaTestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-t border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Lime Highlight Banner Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#bef264] p-8 sm:p-10 flex flex-col justify-between border border-lime-300 shadow-md">
            <div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-black/10 text-xs font-semibold text-[#0e2118] mb-6">
                <span className="flex size-3.5 items-center justify-center rounded-full bg-[#0e2118] text-[#bef264]">
                  <Check className="size-2 stroke-[3]" />
                </span>
                <span>Client Testimonials</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2118] tracking-tight leading-tight mb-4">
                What Our Client Say’s About Us
              </h2>

              {/* Subtext */}
              <p className="text-xs sm:text-sm text-[#0e2118]/80 font-medium leading-relaxed">
                Our bank service is designed to empower your financial dreams with
                innovative solutions and unwavering commitment.
              </p>
            </div>

            {/* Action */}
            <div className="mt-8">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0e2118] text-white hover:bg-[#163628] shadow-sm transition-all"
              >
                <span>Explore Services</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Testimonial Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-center">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl bg-white p-6 border border-black/[0.06] shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* User info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-9 rounded-full object-cover ring-1 ring-black/10"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0e2118]">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
