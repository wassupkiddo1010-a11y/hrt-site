"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import {
  contact,
  footerDisclaimer,
  footerSections,
  footerSocial,
} from "@/data/siteContent";

const socialPaths: Record<(typeof footerSocial)[number]["icon"], string> = {
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

function SocialIcon({ icon, className }: { icon: keyof typeof socialPaths; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={socialPaths[icon]} />
    </svg>
  );
}

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal || href === "#") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-navy-deep text-white">
      <div className="container-main px-6 py-12 lg:py-14">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-5">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-[1.75rem] font-bold text-white group-hover:opacity-90 transition-opacity">
                HRT
              </span>
              <span className="block text-[0.625rem] text-white/55 tracking-[0.14em] uppercase mt-0.5">
                hrt.org
              </span>
            </Link>

            <p className="text-sm text-white/65 leading-relaxed max-w-xs">
              Personalized hormone care for men and women — provider-guided therapy and at-home
              testing.
            </p>

            <div className="flex flex-col gap-3 text-sm text-white/65 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {contact.phone}
              </a>
            </div>

            <div className="flex gap-2 pt-1">
              {footerSocial.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  aria-label={link.title}
                  className="flex size-9 items-center justify-center rounded-md border border-white/15 text-white/65 hover:border-white/30 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  <SocialIcon icon={link.icon} className="size-3.5" />
                </a>
              ))}
            </div>

            <p className="text-white/50 text-xs md:mt-2">
              © {new Date().getFullYear()} HRT.org. All rights reserved.
            </p>
          </AnimatedContainer>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerSections.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                    {section.label}
                  </h3>
                  <ul className="text-white/60 mt-4 space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <FooterLink
                          href={link.href}
                          className="hover:text-white inline-flex items-center transition-colors duration-200"
                        >
                          {link.title}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        <AnimatedContainer delay={0.5} className="w-full mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-white/50 leading-relaxed max-w-3xl">
            {footerDisclaimer}
          </p>
          <p className="text-[0.6875rem] text-white/40 mt-3">{contact.states}</p>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
