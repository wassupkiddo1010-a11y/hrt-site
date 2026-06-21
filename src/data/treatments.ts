export interface Treatment {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export const categories = [
  { id: "hrt", label: "Hormone Replacement Therapy" },
  { id: "peptides", label: "Anti-Aging Peptides" },
  { id: "lab-testing", label: "Lab Testing" },
  { id: "weight", label: "Weight Management" },
  { id: "sexual-health", label: "Sexual Health" },
  { id: "hair-loss", label: "Hair Loss" },
  { id: "men", label: "Men's Treatments" },
  { id: "women", label: "Women's Treatments" },
  { id: "menopause", label: "Menopause Care" },
];

export const treatments: Treatment[] = [
  {
    id: "hrt-men",
    name: "Hormone Replacement Therapy for Men",
    description: "Testosterone therapy for andropause, energy, and vitality restoration.",
    category: "hrt",
    image: "https://images.unsplash.com/photo-1587854692152-c104d548b42a?w=400&q=80",
  },
  {
    id: "hrt-women",
    name: "Hormone Replacement Therapy for Women",
    description: "Bioidentical hormone therapy for menopause and perimenopause support.",
    category: "hrt",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  },
  {
    id: "peptides-men",
    name: "Anti-Aging Peptide Therapy for Men",
    description: "Prescription peptides for muscle mass, recovery, and immune function.",
    category: "peptides",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f326?w=400&q=80",
  },
  {
    id: "peptides-women",
    name: "Anti-Aging Peptide Therapy for Women",
    description: "Peptide formulas for skin elasticity, energy, and overall wellness.",
    category: "peptides",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
  },
  {
    id: "hormone-panel-male",
    name: "Male Hormone Imbalance Test",
    description: "Comprehensive at-home panel for testosterone and related markers.",
    category: "lab-testing",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
  },
  {
    id: "hormone-panel-female",
    name: "Female Hormone Imbalance Test",
    description: "At-home testing for estrogen, progesterone, and thyroid markers.",
    category: "lab-testing",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
  },
  {
    id: "thyroid-test",
    name: "Thyroid Assessment Test",
    description: "Evaluate thyroid function and its impact on hormone balance.",
    category: "lab-testing",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
  },
  {
    id: "weight-men",
    name: "Weight Management for Men",
    description: "Physician-guided program with pharmaceutical support for long-term success.",
    category: "weight",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50e?w=400&q=80",
  },
  {
    id: "weight-women",
    name: "Weight Management for Women",
    description: "Customized weight loss protocols designed for women's hormone health.",
    category: "weight",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50e?w=400&q=80",
  },
  {
    id: "ed-treatment",
    name: "Erectile Dysfunction Treatment",
    description: "Customized compounded pharmaceutical treatment for men's sexual health.",
    category: "sexual-health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
  },
  {
    id: "womens-sexual-health",
    name: "Women's Sexual Health Treatments",
    description: "Support for libido, comfort, and intimacy during hormonal changes.",
    category: "sexual-health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
  },
  {
    id: "hair-men",
    name: "Hair Loss Treatment for Men",
    description: "Prescription treatments for androgenetic alopecia and hair restoration.",
    category: "hair-loss",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
  },
  {
    id: "hair-women",
    name: "Hair Loss Treatment for Women",
    description: "Topical and oral medications for female pattern hair loss.",
    category: "hair-loss",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
  },
  {
    id: "menopause-hrt",
    name: "Menopause Hormone Therapy",
    description: "Relief from hot flashes, mood changes, and sleep disruption.",
    category: "menopause",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  },
  {
    id: "hormone-cream-men",
    name: "Personalized Hormone Cream — Men",
    description: "Custom-compounded topical testosterone for convenient daily application.",
    category: "men",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  },
  {
    id: "hormone-cream-women",
    name: "Personalized Hormone Cream — Women",
    description: "Bioidentical estrogen and progesterone cream tailored to your levels.",
    category: "women",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  },
];

export function getTreatmentsByCategory(categoryId: string): Treatment[] {
  if (!categoryId) return treatments;
  return treatments.filter((t) => t.category === categoryId);
}

export function getCategoryLabel(categoryId: string): string {
  return categories.find((c) => c.id === categoryId)?.label ?? "All Treatments";
}
