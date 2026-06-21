"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface FadeSlideTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface FadeSlideTabsProps {
  items?: FadeSlideTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  showContent?: boolean;
}

export default function FadeSlideTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview content goes here." },
    { value: "activity", label: "Activity", content: "Activity content goes here." },
    { value: "settings", label: "Settings", content: "Settings content goes here." },
    { value: "faq", label: "FAQ", content: "Frequently asked questions." },
  ],
  defaultValue = "overview",
  value,
  onValueChange,
  className,
  listClassName,
  showContent = true,
}: FadeSlideTabsProps) {
  const [internalActive, setInternalActive] = React.useState(defaultValue);
  const active = value ?? internalActive;

  const handleChange = (next: string) => {
    setInternalActive(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <Tabs value={active} onValueChange={handleChange}>
        <TabsList
          className={cn(
            "flex flex-wrap justify-center gap-1 bg-background/60 backdrop-blur-md p-1.5 rounded-xl border border-border/80 h-auto",
            listClassName
          )}
        >
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "relative px-3 py-2 rounded-lg text-[0.8125rem] font-medium transition-colors hover:bg-background/30",
                "data-[state=active]:bg-navy/10 data-[state=active]:text-navy data-[state=active]:shadow-none"
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {showContent && (
          <div className="mt-4 relative w-full min-h-[120px]">
            <AnimatePresence mode="wait">
              {items.map(
                (item) =>
                  item.value === active && (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute inset-0 p-4 bg-card rounded-lg border border-border"
                    >
                      {item.content}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        )}
      </Tabs>
    </div>
  );
}

export { FadeSlideTabs };
