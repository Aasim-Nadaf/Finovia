import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/section/decor-icon";

export function LogoCloud() {
  return (
    <div className="grid grid-cols-2 border md:grid-cols-4">
      <LogoCard className="relative border-r border-b bg-secondary dark:bg-secondary/30">
        <LogoText>Next.js</LogoText>
        <DecorIcon className="z-10" position="bottom-right" />
      </LogoCard>

      <LogoCard className="border-b md:border-r">
        <LogoText>OpenAI</LogoText>
      </LogoCard>

      <LogoCard className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30">
        <LogoText>React</LogoText>
        <DecorIcon className="z-10" position="bottom-right" />
        <DecorIcon className="z-10 hidden md:block" position="bottom-left" />
      </LogoCard>

      <LogoCard className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background">
        <LogoText>Vercel</LogoText>
      </LogoCard>

      <LogoCard className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background">
        <LogoText>Supabase</LogoText>
        <DecorIcon className="z-10 md:hidden" position="bottom-right" />
      </LogoCard>

      <LogoCard className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30">
        <LogoText>TypeScript</LogoText>
      </LogoCard>

      <LogoCard className="border-r">
        <LogoText>Tailwind CSS</LogoText>
      </LogoCard>

      <LogoCard className="bg-secondary dark:bg-secondary/30">
        <LogoText>GitHub</LogoText>
      </LogoCard>
    </div>
  );
}

function LogoText({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none select-none text-sm font-medium tracking-tight text-foreground/70 md:text-base">
      {children}
    </span>
  );
}

function LogoCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
