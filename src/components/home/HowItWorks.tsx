import type { LucideIcon } from "lucide-react";
import { ChevronRight, Laptop, Package, TestTube, UserCheck } from "lucide-react";

const steps: {
  num: number;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    num: 1,
    icon: Laptop,
    title: "Complete Online Intake",
    text: "Share your health history and goals in minutes.",
  },
  {
    num: 2,
    icon: UserCheck,
    title: "Review with Provider",
    text: "A licensed provider reviews and recommends your plan.",
  },
  {
    num: 3,
    icon: TestTube,
    title: "Test When Needed",
    text: "At-home lab testing ensures accurate, personalized care.",
  },
  {
    num: 4,
    icon: Package,
    title: "Receive Personalized Care",
    text: "Your treatment is shipped discreetly with ongoing support.",
  },
];

function ProcessStep({
  step,
  showConnector,
}: {
  step: (typeof steps)[number];
  showConnector?: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex min-w-0 items-start gap-3">
      <div className="relative shrink-0">
        <div className="flex size-[72px] items-center justify-center rounded-xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <Icon className="size-8 text-navy" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <span className="absolute -top-2 -left-2 flex size-7 items-center justify-center rounded-full bg-navy-deep text-[0.8125rem] font-semibold text-white leading-none ring-2 ring-section-bg">
          {step.num}
        </span>
      </div>
      <div className="min-w-0 flex-1 pt-0.5 text-left">
        <h3 className="text-[1rem] font-semibold text-navy leading-snug mb-1">{step.title}</h3>
        <p className="text-[0.9375rem] text-text-muted leading-normal">{step.text}</p>
      </div>

      {showConnector && (
        <ChevronRight
          className="pointer-events-none absolute -right-3 top-[1.625rem] hidden size-4 text-navy/20 lg:block"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden bg-section-bg border-y border-border-soft">
      <div className="container-main py-12 md:py-16 lg:py-[70px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="section-heading mb-8 lg:mb-10">How It Works</h2>

          <ol className="hidden lg:grid list-none grid-cols-4 gap-x-8 min-w-0">
            {steps.map((step, i) => (
              <li key={step.num} className="min-w-0">
                <ProcessStep step={step} showConnector={i < steps.length - 1} />
              </li>
            ))}
          </ol>

          <ol className="hidden sm:grid lg:hidden list-none grid-cols-2 gap-x-8 gap-y-8 max-w-2xl mx-auto">
            {steps.map((step) => (
              <li key={step.num} className="min-w-0">
                <ProcessStep step={step} />
              </li>
            ))}
          </ol>

          <ol className="sm:hidden list-none max-w-md mx-auto space-y-5">
            {steps.map((step, i) => (
              <li key={step.num} className="relative min-w-0">
                {i < steps.length - 1 && (
                  <span
                    className="absolute left-[2.25rem] top-[4.75rem] bottom-[-1.25rem] w-px bg-border/80"
                    aria-hidden="true"
                  />
                )}
                <div className="rounded-lg border border-border bg-white px-4 py-4 shadow-[var(--shadow-sm)]">
                  <ProcessStep step={step} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
