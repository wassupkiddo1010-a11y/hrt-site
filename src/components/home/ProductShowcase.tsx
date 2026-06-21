import Image from "next/image";
import Link from "next/link";

const products = {
  men: {
    src: "/images/product-men.png?v=3",
    alt: "HRT Lab personalized hydration cream product for men",
    width: 934,
    height: 1015,
    title: "Men's Product Line",
    description: "Compounded testosterone creams customized to your unique needs.",
    href: "/treatments?category=men",
    cta: "Explore Men's Products",
    btnClass: "btn-navy",
  },
  women: {
    src: "/images/product-women.png?v=3",
    alt: "HRT personalized replenishing cream product for women",
    width: 865,
    height: 1015,
    title: "Women's Product Line",
    description: "Compounded hormone creams customized for women's health.",
    href: "/treatments?category=women",
    cta: "Explore Women's Products",
    btnClass: "btn-rose",
  },
} as const;

export default function ProductShowcase() {
  return (
    <section className="section bg-bg-subtle">
      <div className="container-main">
        <h2 className="section-heading">Explore Our Product Lines</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {(["men", "women"] as const).map((variant) => {
            const product = products[variant];
            return (
              <article
                key={variant}
                className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border border-border bg-white p-6 md:p-8 shadow-[var(--shadow-soft)]"
              >
                <div className="flex-1 w-full">
                  <h3 className="font-serif text-[1.125rem] font-bold text-navy mb-3">{product.title}</h3>
                  <p className="text-[0.875rem] text-text-muted leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <Link href={product.href} className={`btn ${product.btnClass} text-[0.8125rem]`}>
                    {product.cta}
                  </Link>
                </div>
                <div className="shrink-0 flex items-center justify-center w-[140px] md:w-[165px]">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto max-h-[220px] object-contain object-center"
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
