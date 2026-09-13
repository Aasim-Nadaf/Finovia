import type React from "react";

export const LogoIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="36" height="36" rx="10" fill="#BEF264" />
    <path
      d="M10 24C12 21 16 20 20 20C24 20 25.5 17 26 13M10 18C13 15 16 15 20 15C22 15 24 13.5 25 11"
      stroke="#0E2118"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={`inline-flex items-center gap-2.5 ${className ?? ""}`} {...props}>
    <LogoIcon className="size-8 shrink-0" />
    <span className="text-xl font-bold tracking-tight text-[#0e2118]">
      Finovia
    </span>
  </div>
);

