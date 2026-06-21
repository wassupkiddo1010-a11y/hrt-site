"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/siteContent";
import { cn } from "@/lib/utils";

type RotatingWord = {
  text: string;
  className?: string;
};

interface AnimatedHeroProps {
  className?: string;
  /** Words that rotate in the headline — defaults to men / women */
  rotatingWords?: RotatingWord[];
  /** Milliseconds between word changes */
  intervalMs?: number;
}

function AnimatedHero({
  className,
  rotatingWords,
  intervalMs = 2500,
}: AnimatedHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo<RotatingWord[]>(
    () =>
      rotatingWords ?? [
        { text: "men", className: "text-blue" },
        { text: "women", className: "text-rose" },
      ],
    [rotatingWords]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [prefersReducedMotion, words.length, intervalMs]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-serif font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-navy">
            <span className="block">Personalized hormone health for</span>
            <span className="relative flex h-[1.15em] items-center overflow-hidden">
              {prefersReducedMotion ? (
                <span className="font-semibold text-navy">men and women</span>
              ) : (
                words.map((word, index) => (
                  <motion.span
                    key={word.text}
                    className={cn("absolute font-semibold capitalize", word.className)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                      activeIndex === index
                        ? { y: 0, opacity: 1 }
                        : { y: activeIndex > index ? -40 : 40, opacity: 0 }
                    }
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  >
                    {word.text}
                  </motion.span>
                ))
              )}
            </span>
            <span className="block text-[0.92em] mt-1 font-medium text-navy/90">
              guided by science
            </span>
          </h1>

          <p className="text-text-muted text-[0.9375rem] leading-relaxed max-w-lg">
            {hero.subheadline}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <GetStartedButton size="lg" />
          <Button asChild variant="outline" size="lg" className="gap-2 rounded-[0.4375rem] border-border font-semibold">
            <Link href="/treatments">
              Explore Treatments
              <MoveRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
