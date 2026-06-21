import type { LucideIcon } from "lucide-react";
import { Stethoscope, TestTube, ClipboardList, Package } from "lucide-react";

const items: {
  icon: LucideIcon;
  title: string;
  text: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    icon: Stethoscope,
    title: "Provider Guided",
    text: "Experienced providers guide your care every step of the way.",
    iconBg: "bg-blue-soft/70",
    iconColor: "text-blue",
  },
  {
    icon: TestTube,
    title: "At-Home Lab Testing",
    text: "Convenient testing with lab partners you can trust.",
    iconBg: "bg-blue-soft",
    iconColor: "text-blue",
  },
  {
    icon: ClipboardList,
    title: "Personalized Treatment Plans",
    text: "Care plans tailored to your unique needs and goals.",
    iconBg: "bg-rose-soft",
    iconColor: "text-rose",
  },
  {
    icon: Package,
    title: "Discreet Delivery",
    text: "Private, secure shipping to your door.",
    iconBg: "bg-border-soft",
    iconColor: "text-navy-2",
  },
];

export default function BenefitsBar() {
  return (
    <section className="bg-bg border-b border-border/70">
      <div className="container-main py-8 md:py-9">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 lg:gap-y-0">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center text-center sm:items-start sm:text-left px-4 sm:px-6 ${
                index > 0 ? "lg:border-l lg:border-border/60 lg:pl-8 lg:pr-2" : "lg:pr-2"
              }`}
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-full ${item.iconBg} ring-1 ring-inset ring-black/[0.04]`}
              >
                <item.icon className={`size-5 ${item.iconColor}`} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <p className="text-[0.9375rem] font-semibold text-navy mb-1.5 tracking-tight">
                {item.title}
              </p>
              <p className="text-[0.8125rem] text-text-muted leading-relaxed max-w-[220px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
