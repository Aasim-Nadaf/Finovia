import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/section/portal";
import { navLinks } from "@/components/section/header";
import { Menu, X } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4 bg-white",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link: { label: string; href: string }) => (
                <Button
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                  render={<a href={link.href} />}
                  nativeButton={false}
                >
                  {link.label}
                </Button>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <Button
                className="w-full"
                variant="outline"
                render={<a href="#login" />}
                nativeButton={false}
              >
                Log in
              </Button>
              <Button className="w-full bg-[#0e2118] text-white">Sign Up</Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

