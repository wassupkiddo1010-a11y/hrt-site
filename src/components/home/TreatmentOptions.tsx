import Image from "next/image";
import Link from "next/link";
import { deliveryOptions } from "@/data/siteContent";

function GenderBadge({ label }: { label: "Men" | "Women" }) {
  const isMen = label === "Men";
  return (
    <span
      className={`inline-flex rounded px-1.5 py-0.5 text-[0.625rem] font-semibold leading-none ${
        isMen ? "bg-blue-soft text-blue" : "bg-rose-soft text-rose"
      }`}
    >
      {label}
    </span>
  );
}

export default function TreatmentOptions() {
  return (
    <section className="bg-bg py-11 md:py-12 lg:py-14">
      <div className="container-main max-w-[1280px]">
        <h2 className="section-heading !mb-7 md:!mb-8">Treatment Options Designed Around You</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {deliveryOptions.map((item) => {
            const isContain = item.imageFit === "contain";

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex h-[156px] sm:h-[168px] lg:h-[176px] overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-soft)]"
              >
                <div
                  className={`relative w-[44%] shrink-0 overflow-hidden ${item.imageBg}`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                      isContain
                        ? "object-contain object-center p-3 sm:p-3.5"
                        : "object-cover object-center"
                    }`}
                    sizes="(max-width: 1024px) 200px, 180px"
                    unoptimized={item.unoptimized}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3 sm:px-4">
                  <h3 className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-navy leading-snug mb-1.5 group-hover:underline underline-offset-2">
                    {item.title}
                  </h3>

                  {"badges" in item && item.badges ? (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.badges.map((badge) => (
                        <GenderBadge key={badge} label={badge} />
                      ))}
                    </div>
                  ) : null}

                  <p className="text-[0.75rem] sm:text-[0.8125rem] text-text-muted leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
