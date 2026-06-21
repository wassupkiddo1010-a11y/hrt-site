import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  FlaskConical,
  Heart,
  Mars,
  Pill,
  Scale,
  ScanLine,
  TestTube,
  Venus,
  Waves,
} from "lucide-react";
import { carePathways } from "@/data/siteContent";

type PathwayIcon =
  | (typeof carePathways.men.pathways)[number]["icon"]
  | (typeof carePathways.women.pathways)[number]["icon"];

const pathwayIcons: Record<PathwayIcon, LucideIcon> = {
  activity: Activity,
  scale: Scale,
  flask: FlaskConical,
  heart: Heart,
  scan: ScanLine,
  testTube: TestTube,
  waves: Waves,
  pill: Pill,
};

type PanelVariant = "men" | "women";

const panelStyles: Record<
  PanelVariant,
  {
    accentBar: string;
    iconWrap: string;
    iconColor: string;
    pillBorder: string;
    pillBg: string;
    pillIcon: string;
    pillHover: string;
    btnClass: string;
    imageBg: string;
  }
> = {
  men: {
    accentBar: "bg-blue",
    iconWrap: "bg-blue-soft",
    iconColor: "text-blue",
    pillBorder: "border-border",
    pillBg: "bg-blue-soft/40",
    pillIcon: "text-blue",
    pillHover: "hover:border-blue/25 hover:bg-blue-soft/70",
    btnClass: "btn-navy",
    imageBg: "bg-blue-soft/30",
  },
  women: {
    accentBar: "bg-rose",
    iconWrap: "bg-rose-soft",
    iconColor: "text-rose",
    pillBorder: "border-border",
    pillBg: "bg-rose-soft/60",
    pillIcon: "text-rose",
    pillHover: "hover:border-rose/25 hover:bg-rose-soft",
    btnClass: "btn-rose",
    imageBg: "bg-rose-soft/40",
  },
};

function PathwayPanel({
  variant,
  panel,
}: {
  variant: PanelVariant;
  panel: typeof carePathways.men | typeof carePathways.women;
}) {
  const styles = panelStyles[variant];
  const GenderIcon = variant === "men" ? Mars : Venus;

  return (
    <article className="relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-[var(--shadow-soft)]">
      <div className={`h-1 w-full ${styles.accentBar}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6 md:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${styles.iconWrap}`}
                aria-hidden="true"
              >
                <GenderIcon className={`size-[18px] ${styles.iconColor}`} strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-[1.125rem] font-bold leading-tight text-navy md:text-[1.25rem]">
                {panel.title}
              </h3>
            </div>

            <p className="text-[0.875rem] leading-relaxed text-text-muted md:max-w-[95%]">
              {panel.description}
            </p>
          </div>

          <div
            className={`hidden shrink-0 items-end justify-center rounded-xl p-2 sm:flex sm:w-[88px] md:w-[96px] ${styles.imageBg}`}
          >
            <Image
              src={panel.image}
              alt={panel.imageAlt}
              width={variant === "men" ? 934 : 865}
              height={1015}
              className="h-auto w-full max-h-[88px] object-contain object-bottom opacity-90"
              unoptimized
            />
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" role="list">
          {panel.pathways.map((pathway) => {
            const Icon = pathwayIcons[pathway.icon];

            return (
              <li key={pathway.label}>
                <Link
                  href={pathway.href}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.75rem] font-medium text-text transition-colors duration-200 ${styles.pillBorder} ${styles.pillBg} ${styles.pillHover}`}
                >
                  <Icon className={`size-3.5 shrink-0 ${styles.pillIcon}`} strokeWidth={1.5} aria-hidden="true" />
                  {pathway.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-border-soft pt-6">
          <Link href={panel.href} className={`btn text-[0.8125rem] ${styles.btnClass}`}>
            {panel.cta}
          </Link>

          <div className={`flex items-center justify-center rounded-lg p-2 sm:hidden ${styles.imageBg}`}>
            <Image
              src={panel.image}
              alt=""
              width={variant === "men" ? 934 : 865}
              height={1015}
              className="h-auto w-[72px] object-contain opacity-85"
              unoptimized
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CarePathways() {
  return (
    <section id="care-pathways" className="section bg-off-white">
      <div className="container-main">
        <h2 className="section-heading">{carePathways.heading}</h2>
        <p className="-mt-5 mb-9 max-w-2xl mx-auto text-center text-[0.9375rem] leading-relaxed text-text-muted md:mb-10">
          {carePathways.subtitle}
        </p>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <PathwayPanel variant="men" panel={carePathways.men} />
          <PathwayPanel variant="women" panel={carePathways.women} />
        </div>
      </div>
    </section>
  );
}
