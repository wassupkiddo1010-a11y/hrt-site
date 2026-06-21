"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { GetStartedButton } from "@/components/ui/get-started-button";

const nav = [
  { label: "Men", href: "/treatments?category=men" },
  { label: "Women", href: "/treatments?category=women" },
  { label: "Lab Testing", href: "/treatments?category=lab-testing" },
  { label: "Treatments", href: "/treatments" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Resources", href: "/#testimonials" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link href="/" className="flex flex-col leading-none shrink-0 group">
            <span className="font-serif text-[1.5rem] font-bold text-navy group-hover:opacity-90 transition-opacity">
              HRT
            </span>
            <span className="text-[0.625rem] text-text-muted tracking-[0.14em] uppercase mt-0.5">
              hrt.org
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.875rem] font-medium text-text hover:text-navy transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <GetStartedButton size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              className="lg:hidden p-2.5 -mr-2 text-navy min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-bg z-40 overflow-y-auto border-t border-border">
          <nav className="container-main py-4 flex flex-col" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3.5 text-[0.9375rem] font-medium text-text border-b border-border hover:text-navy transition-colors min-h-[44px] flex items-center"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <GetStartedButton className="mt-5 w-full justify-center" onClick={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}
