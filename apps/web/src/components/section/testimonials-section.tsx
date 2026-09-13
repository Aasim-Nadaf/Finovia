import { DecorIcon } from "@/components/section/decor-icon";
import { FullWidthDivider } from "@/components/section/full-width-divider";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote:
      "CVLens helped me identify critical keywords I was missing. After optimizing my resume with their suggestions, I started getting callbacks from top tech companies within weeks.",
  },
  {
    name: "James Mitchell",
    role: "Recent CS Graduate",
    quote:
      "As a fresh graduate, I had no idea how ATS systems worked. CVLens showed me exactly what recruiters were looking for and helped me tailor my resume. My interview rate jumped from 5% to 35%.",
  },
  {
    name: "Ananya Patel",
    role: "HR Manager at Deloitte",
    quote:
      "I recommend CVLens to every candidate I work with. The AI analysis is remarkably accurate and the suggestions are practical. It saves hours of manual resume review.",
  },
];

function StarIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.065 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.284-3.957z" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="mb-12">
      <h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        What Our <span className="font-bold text-foreground">Users Say</span>
      </h2>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />

        <div className="grid grid-cols-1 border md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={cn(
                "flex flex-col justify-between gap-6 p-6 md:p-8",
                // alternating background on 1st and 3rd cards
                index % 2 === 0 && "bg-secondary dark:bg-secondary/30",
                // border-b on mobile for all but last
                index < testimonials.length - 1 && "border-b md:border-b-0",
                // border-r on desktop for all but last
                index < testimonials.length - 1 && "md:border-r",
              )}
            >
              {/* Stars */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-4 text-foreground"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
