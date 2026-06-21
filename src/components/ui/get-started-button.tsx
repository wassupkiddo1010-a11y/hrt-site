"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface GetStartedButtonProps {
  children?: React.ReactNode;
  href?: string;
  variant?: "navy" | "rose";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function GetStartedButton({
  children = "Get Started",
  href = "/#get-started",
  variant = "navy",
  size = "lg",
  className,
  onClick,
}: GetStartedButtonProps) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "group relative overflow-hidden rounded-[0.4375rem] border-0 font-semibold shadow-sm",
        size === "sm" ? "pl-4 pr-11" : "pl-6 pr-14",
        variant === "navy" && "bg-navy-deep text-white hover:bg-navy",
        variant === "rose" && "bg-rose text-white hover:bg-rose-hover",
        className
      )}
    >
      <Link href={href} onClick={onClick}>
        <span className="mr-2 transition-opacity duration-500 group-hover:opacity-0">{children}</span>
        <span
          className={cn(
            "absolute right-1 top-1 bottom-1 z-10 grid w-1/4 place-items-center rounded-sm transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95",
            variant === "navy" && "bg-white/15 text-white",
            variant === "rose" && "bg-white/20 text-white"
          )}
          aria-hidden="true"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      </Link>
    </Button>
  );
}
