import Image from "next/image";
import Link from "next/link";
import { Mars, Venus } from "lucide-react";
import { genderPathways } from "@/data/siteContent";

const productImages = {
  men: {
    src: "/images/product-men.png?v=3",
    alt: "HRT Lab personalized hydration cream product for men",
    width: 934,
    height: 1015,
  },
  women: {
    src: "/images/product-women.png?v=3",
    alt: "HRT personalized replenishing cream product for women",
    width: 865,
    height: 1015,
  },
} as const;

export default function GenderCards() {
  const cards = [
    { ...genderPathways.men, variant: "men" as const, icon: Mars },
    { ...genderPathways.women, variant: "women" as const, icon: Venus },
  ];

  return (
    <section className="py-14 md:py-16 bg-section-bg border-y border-border-soft">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((card) => {
            const product = productImages[card.variant];

            return (
              <article
                key={card.title}
                className="card card-interactive p-6 md:p-7 flex gap-5 items-stretch"
              >
                <div className="flex-1 flex flex-col min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                      card.variant === "men" ? "bg-blue-soft" : "bg-rose-soft"
                    }`}
                    aria-hidden="true"
                  >
                    <card.icon
                      className={`w-[18px] h-[18px] ${card.variant === "men" ? "text-blue" : "text-rose"}`}
                      strokeWidth={2}
                    />
                  </div>
                  <h2 className="font-serif text-[1.25rem] font-bold text-navy mb-2">{card.title}</h2>
                  <p className="text-[0.875rem] text-text-muted leading-relaxed flex-1 mb-6">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className={`btn self-start text-[0.8125rem] ${card.variant === "men" ? "btn-navy" : "btn-rose"}`}
                  >
                    {card.cta}
                  </Link>
                </div>

                <div className="hidden sm:flex shrink-0 items-center justify-center w-[130px] md:w-[150px]">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto max-h-[240px] object-contain object-center"
                    unoptimized
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
