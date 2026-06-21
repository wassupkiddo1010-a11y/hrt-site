import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Hormone Replacement Therapy",
    description:
      "Bioidentical hormone therapy for men and women to restore balance, energy, and vitality.",
    image: "https://images.unsplash.com/photo-1587854692152-c104d548b42a?w=500&q=80",
    href: "/treatments?category=hrt",
    linkText: "hormone replacement therapy",
  },
  {
    title: "Peptide Therapy",
    description:
      "Prescription peptide formulas to support anti-aging, recovery, and overall wellness.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f326?w=500&q=80",
    href: "/treatments?category=peptides",
    linkText: "peptide therapy",
  },
  {
    title: "Lab Testing",
    description:
      "At-home hormone panels and comprehensive testing to understand your baseline and track progress.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80",
    href: "/treatments?category=lab-testing",
    linkText: "lab testing",
  },
  {
    title: "Weight Management",
    description:
      "Physician-guided pharmaceutical support designed for sustainable weight loss and long-term success.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50e?w=500&q=80",
    href: "/treatments?category=weight",
    linkText: "weight management",
  },
  {
    title: "Sexual Health",
    description:
      "Customized compounded treatments to restore intimacy, function, and confidence.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
    href: "/treatments?category=sexual-health",
    linkText: "sexual health",
  },
  {
    title: "Hair Loss",
    description:
      "Prescription hair loss treatments and topical medications for renewed growth and density.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    href: "/treatments?category=hair-loss",
    linkText: "hair loss treatment",
  },
];

export default function TreatmentRange() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
          Our treatment range
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group">
              <div className="relative aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-navy transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{cat.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-foreground group-hover:text-navy transition-colors">
                More about {cat.linkText}
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
