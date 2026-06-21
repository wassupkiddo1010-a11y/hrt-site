"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap border font-medium text-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy/5 hover:bg-navy/[0.02] border-navy/20 text-navy",
        solid: "bg-navy hover:bg-navy-hover text-white border-transparent shadow-sm",
        rose: "bg-rose hover:bg-rose-hover text-white border-transparent shadow-sm",
        ghost: "border-transparent bg-transparent text-navy hover:border-border hover:bg-bg-subtle",
      },
      size: {
        default: "px-7 py-1.5 text-sm min-h-[40px]",
        sm: "px-4 py-0.5 text-xs min-h-[32px]",
        lg: "px-8 py-2.5 text-sm min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

const neonGlowVariants = cva("", {
  variants: {
    accent: {
      navy: "before:via-blue-accent after:via-blue-accent",
      rose: "before:via-rose after:via-rose",
    },
  },
  defaultVariants: {
    accent: "navy",
  },
});

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  neon?: boolean;
  asChild?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const accent = variant === "rose" ? "rose" : "navy";

    return (
      <Comp
        className={cn(
          neonButtonVariants({ variant, size }),
          neon &&
            cn(
              "before:pointer-events-none before:absolute before:inset-x-[12.5%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
              "after:pointer-events-none after:absolute after:inset-x-[12.5%] after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:to-transparent after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-30",
              neonGlowVariants({ accent })
            ),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
NeonButton.displayName = "NeonButton";

export { NeonButton, neonButtonVariants };
