import { LogoCloud } from "@/components/section/logo-cloud";
import { DecorIcon } from "@/components/section/decor-icon";
import { FullWidthDivider } from "@/components/section/full-width-divider";

export function LogosSection() {
  return (
    <section className="mb-12">
      <h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        Powered by modern <span className="text-foreground">technology</span>
      </h2>
      <div className="relative *:border-0">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />
        <LogoCloud />
        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
