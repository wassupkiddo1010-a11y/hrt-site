import { Gem, Cpu, GraduationCap, HeartHandshake } from "lucide-react";

const partners = [
  "MedMind",
  "Compounding Pharmacy",
  "LabCorp",
  "Quest Diagnostics",
  "Telehealth Partners",
  "Clinical Labs",
];

const features = [
  {
    icon: Gem,
    title: "High-quality hormone products",
    description:
      "Our portfolio includes bioidentical hormones, peptide therapies, compounded medications, at-home test kits, and nutraceutical support. We also offer a range of related accessories.",
  },
  {
    icon: Cpu,
    title: "Modern telehealth systems",
    description:
      "Discover our advanced platform, including secure virtual consultations, digital lab ordering, and real-time treatment tracking.",
  },
  {
    icon: GraduationCap,
    title: "Patient education",
    description:
      "We offer comprehensive resources and educational content to ensure patients and providers are thoroughly familiar with hormone health and treatment options.",
  },
  {
    icon: HeartHandshake,
    title: "Personal care",
    description:
      "At HRT.org, our patients are our top priority. Our team provides reliable support — from treatment selection and testing to ongoing collaboration.",
  },
];

export default function PartnerFeatures() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16 opacity-60">
          {partners.map((name) => (
            <span key={name} className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              {name}
            </span>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-16 max-w-3xl mx-auto leading-snug">
          HRT.org — Your reliable partner in hormone health
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item) => (
            <div key={item.title}>
              <item.icon className="w-8 h-8 text-gold mb-5 stroke-[1.5]" />
              <h3 className="font-semibold text-foreground text-base mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
