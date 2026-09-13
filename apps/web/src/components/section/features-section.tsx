import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/section/decor-icon";
import { FullWidthDivider } from "@/components/section/full-width-divider";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Tag01Icon,
  AiChat02Icon,
  File01Icon,
  Layers01Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

type Feature = {
  icon: IconSvgElement;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Search01Icon,
    title: "ATS Score Analysis",
    description:
      "Get an instant compatibility score showing how well your resume matches Applicant Tracking Systems.",
  },
  {
    icon: Tag01Icon,
    title: "Keyword Matching",
    description:
      "Identify missing keywords from the job description and see which ones you already have.",
  },
  {
    icon: AiChat02Icon,
    title: "AI Suggestions",
    description:
      "Receive intelligent, actionable suggestions to improve each section of your resume.",
  },
  {
    icon: File01Icon,
    title: "Job Description Parser",
    description:
      "Paste any job posting and our AI extracts the key requirements and skills needed.",
  },
  {
    icon: Layers01Icon,
    title: "Section-by-Section Review",
    description:
      "Detailed analysis of your experience, education, skills, and summary sections.",
  },
  {
    icon: Download04Icon,
    title: "Export Report",
    description:
      "Download a comprehensive PDF report with your analysis results and improvement plan.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mb-12">
      <h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        Everything You Need to{" "}
        <span className="text-foreground">Perfect Your Resume</span>
      </h2>
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />
        <div className="grid grid-cols-1 border md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}

/**
 * Checkerboard pattern for 2x3 grid:
 * Row 1: [bg] [  ] [bg]   → indices 0, 2, 4 in a 3-col row get bg on even positions
 * Row 2: [  ] [bg] [  ]   → indices 3, 5 in a 3-col row get bg on odd positions
 *
 * Indices with secondary bg: 0, 2, 3, 5
 * Indices without: 1, 4
 */
const secondaryIndices = new Set([0, 2, 3, 5]);

type FeatureCardProps = {
  feature: Feature;
  index: number;
};

function FeatureCard({ feature, index }: FeatureCardProps) {
  const hasSecondaryBg = secondaryIndices.has(index);

  // Border-right for cards not at the right edge of a row
  // In a 3-col layout: indices 0,1,3,4 get border-right (not 2,5)
  // In a 2-col layout: indices 0,2,4 get border-right (not 1,3,5)
  // In a 1-col layout: no border-right
  const isLastInRow3 = (index + 1) % 3 === 0;
  const isLastInRow2 = (index + 1) % 2 === 0;

  // Border-bottom for cards not in the last row
  // In a 3-col layout: indices 0,1,2 get border-bottom (not 3,4,5)
  // In a 2-col layout: indices 0,1,2,3 get border-bottom (not 4,5)
  // In a 1-col layout: indices 0,1,2,3,4 get border-bottom (not 5)
  const isLastRow3 = index >= 3;
  const isLastRow2 = index >= 4;
  const isLastRow1 = index >= 5;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-6 md:p-8",
        hasSecondaryBg && "bg-secondary dark:bg-secondary/30",
        // border-right
        !isLastRow1 && "border-b",
        !isLastRow2 && "md:border-b",
        isLastRow2 && "md:border-b-0",
        !isLastRow3 && "lg:border-b",
        isLastRow3 && "lg:border-b-0",
        // border-right for 2-col
        !isLastInRow2 && "md:border-r",
        isLastInRow2 && "md:border-r-0",
        // border-right for 3-col
        !isLastInRow3 && "lg:border-r",
        isLastInRow3 && "lg:border-r-0",
      )}
    >
      <HugeiconsIcon
        icon={feature.icon}
        strokeWidth={2}
        className="size-5 text-foreground"
      />
      <h3 className="font-medium text-foreground">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </div>
  );
}
