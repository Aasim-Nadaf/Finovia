import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

export function CtaSection() {
  return (
    <section className="relative py-12 md:py-24">
      {/* Background effects — same as hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-1 size-full overflow-hidden"
      >
        <div
          className={cn(
            "absolute -inset-x-20 inset-y-0 z-0 rounded-full",
            "bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
            "blur-[50px]",
          )}
        />
        <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
        <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
        <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
        <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-5 px-4">
        <h2 className="text-balance text-center text-3xl text-foreground md:text-4xl">
          Ready to Perfect Your Resume?
        </h2>

        <p className="text-center text-muted-foreground">
          Join thousands of job seekers who have optimized their resumes with
          CVLens.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button>
            Analyze My Resume{" "}
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              strokeWidth={2}
              data-icon="inline-end"
            />
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
