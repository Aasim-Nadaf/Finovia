import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/section/decor-icon";
import { FullWidthDivider } from "@/components/section/full-width-divider";

const stats = [
  { value: "50,000+", label: "Resumes Analyzed" },
  { value: "+32%", label: "Avg. Score Improvement" },
  { value: "12,000+", label: "Job Seekers Helped" },
  { value: "98.5%", label: "Keyword Accuracy" },
] as const;

export function StatsSection() {
  return (
    <section className="mb-12">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />

        <div className="grid grid-cols-2 border md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "p-6 text-center md:p-8",
                // border-right on all except last in each row
                // mobile: 2 cols, so odd indices (1, 3) are last in row
                // desktop: 4 cols, so only index 3 is last
                index % 2 !== 1 && "border-r md:border-r",
                index % 2 === 1 && "md:border-r",
                index === 3 && "md:border-r-0",
                // border-bottom on first row (mobile only)
                index < 2 && "border-b md:border-b-0",
                // alternating background on 1st and 4th cells
                (index === 0 || index === 3) &&
                  "bg-secondary dark:bg-secondary/30",
              )}
            >
              <p className="text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
