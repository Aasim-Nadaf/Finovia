import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/section/decor-icon";
import { FullWidthDivider } from "@/components/section/full-width-divider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload04Icon, FileAddIcon, AiChat02Icon } from "@hugeicons/core-free-icons";

const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description:
      "Drag and drop your PDF or paste your resume text. We support all major formats.",
    icon: Upload04Icon,
  },
  {
    number: "02",
    title: "Add Job Description",
    description:
      "Paste the job listing you're targeting. Our AI parses the requirements automatically.",
    icon: FileAddIcon,
  },
  {
    number: "03",
    title: "Get AI Analysis",
    description:
      "Receive a detailed report with your ATS score, keyword gaps, and personalized improvement tips.",
    icon: AiChat02Icon,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mb-12">
      <h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        How It <span className="font-bold text-foreground">Works</span>
      </h2>

      <p className="pb-8 text-center text-sm text-muted-foreground">
        Three simple steps to optimize your resume
      </p>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />

        <div className="grid grid-cols-1 border md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "flex flex-col gap-4 p-6 md:p-8",
                // border-right between columns (not on last)
                index < steps.length - 1 && "border-b md:border-r md:border-b-0",
                // alternating background on 1st and 3rd
                index % 2 === 0 && "bg-secondary dark:bg-secondary/30",
              )}
            >
              <div className="flex size-8 items-center justify-center rounded-full border text-sm font-medium">
                {step.number}
              </div>

              <HugeiconsIcon
                icon={step.icon}
                strokeWidth={2}
                className="size-6 text-foreground"
              />

              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
