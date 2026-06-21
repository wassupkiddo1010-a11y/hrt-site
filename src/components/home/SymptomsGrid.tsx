import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Battery,
  Brain,
  Flame,
  Heart,
  Moon,
  Scale,
  Smile,
} from "lucide-react";
import { symptoms } from "@/data/siteContent";

const symptomConfig: Record<
  string,
  { icon: LucideIcon; iconBg: string; iconColor: string }
> = {
  "Low Energy": { icon: Battery, iconBg: "bg-blue-soft", iconColor: "text-blue" },
  "Poor Sleep": { icon: Moon, iconBg: "bg-border-soft", iconColor: "text-navy" },
  "Brain Fog": { icon: Brain, iconBg: "bg-blue-soft", iconColor: "text-blue" },
  "Mood Changes": { icon: Smile, iconBg: "bg-rose-soft", iconColor: "text-rose" },
  "Weight Changes": { icon: Scale, iconBg: "bg-blue-soft/60", iconColor: "text-blue" },
  "Low Libido": { icon: Heart, iconBg: "bg-rose-soft", iconColor: "text-rose" },
  "Hot Flashes": { icon: Flame, iconBg: "bg-rose-soft", iconColor: "text-rose-2" },
  "Poor Recovery": { icon: Activity, iconBg: "bg-blue-soft", iconColor: "text-navy" },
};

export default function SymptomsGrid() {
  return (
    <section id="symptoms" className="pt-10 pb-16 md:pt-12 md:pb-20 bg-section-bg">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blue mb-3">
            Common Signs
          </p>
          <h2 className="section-heading !mb-3 font-serif">
            Hormone Imbalance Can Affect More Than You Think
          </h2>
          <p className="text-[0.9375rem] text-text-muted leading-relaxed">
            Symptoms can show up in energy, sleep, mood, metabolism, libido, and recovery.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5 max-w-4xl mx-auto"
          role="list"
        >
          {symptoms.map((label) => {
            const config = symptomConfig[label] ?? {
              icon: Activity,
              iconBg: "bg-blue-soft",
              iconColor: "text-navy",
            };
            const Icon = config.icon;

            return (
              <li key={label}>
                <div className="group flex flex-col items-center text-center rounded-2xl border border-border bg-white px-4 py-5 shadow-[var(--shadow-sm)] transition-all duration-200 hover:border-blue/20 hover:shadow-[var(--shadow-soft)]">
                  <div
                    className={`mb-3 flex size-10 items-center justify-center rounded-full ${config.iconBg} ring-1 ring-inset ring-black/[0.03] transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon
                      className={`size-[1.125rem] ${config.iconColor}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[0.8125rem] font-medium text-text leading-snug">
                    {label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
