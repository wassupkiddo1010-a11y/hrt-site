import type { LucideIcon } from "lucide-react";
import { Atom, Dna, Home } from "lucide-react";
import { whyChooseHrt } from "@/data/siteContent";

const iconMap: Record<(typeof whyChooseHrt.cards)[number]["icon"], LucideIcon> = {
  atom: Atom,
  dna: Dna,
  home: Home,
};

export default function WhyChoose() {
  return (
    <section className="bg-section-bg border-y border-border-soft">
      <div className="container-main max-w-[1180px] py-12 md:py-14 lg:py-[60px]">
        <h2 className="section-heading !mb-7 md:!mb-8">Why Choose HRT.org?</h2>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none"
          role="list"
        >
          {whyChooseHrt.cards.map((card) => {
            const Icon = iconMap[card.icon];

            return (
              <li key={card.title}>
                <article className="flex h-full min-h-[150px] lg:min-h-[168px] items-start gap-5 rounded-2xl border border-border bg-white px-7 py-7 md:px-8 md:py-8 shadow-[var(--shadow-soft)]">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-soft"
                    aria-hidden="true"
                  >
                    <Icon className="size-6 text-navy" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 text-left pt-0.5">
                    <h3 className="text-[0.9375rem] font-semibold text-navy leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[0.875rem] text-text-muted leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
