import Image from "next/image";
import { Shield, UserCheck, TestTube } from "lucide-react";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { hero } from "@/data/siteContent";

const trustIcons = [Shield, UserCheck, TestTube];

export default function HeroSection() {
  return (
    <section className="bg-bg">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-14 md:py-20 lg:py-24">
          <div>
            <AnimatedHero />
            <ul
              className="flex flex-wrap gap-x-6 gap-y-3 text-[0.8125rem] text-text-muted mt-9"
              role="list"
            >
              {hero.trust.map((label, i) => {
                const Icon = trustIcons[i];
                return (
                  <li key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-navy shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative w-full">
            {/* unoptimized: serves public file directly — avoids stale /_next/image cache after file swaps */}
            <Image
              src="/images/hero-products.png?v=2"
              alt="HRT personalized hormone cream for men and women with compounded testosterone and Bi-Est progesterone"
              width={1455}
              height={1081}
              className="w-full h-auto"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
