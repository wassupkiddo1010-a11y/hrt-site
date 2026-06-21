export const megaMenuCategories = [
  { id: "hormone-therapy", label: "Hormone Therapy" },
  { id: "testosterone", label: "Testosterone Support" },
  { id: "menopause", label: "Menopause Care" },
  { id: "weight", label: "Weight Management" },
  { id: "thyroid", label: "Thyroid Support" },
  { id: "lab-testing", label: "Lab Testing" },
];

export const megaMenuTreatments: Record<
  string,
  { title: string; description: string; href: string }[]
> = {
  "hormone-therapy": [
    {
      title: "Bioidentical Hormone Creams",
      description: "Custom-compounded topical formulations for daily use.",
      href: "/treatments?category=hrt",
    },
    {
      title: "HRT for Women",
      description: "Estrogen and progesterone support through menopause.",
      href: "/treatments/hrt-women",
    },
    {
      title: "HRT for Men",
      description: "Testosterone therapy guided by lab results.",
      href: "/treatments/hrt-men",
    },
  ],
  testosterone: [
    {
      title: "Testosterone Replacement",
      description: "Provider-supervised therapy for low testosterone.",
      href: "/treatments/hrt-men",
    },
    {
      title: "Injectable Testosterone",
      description: "Precision-dosed injectable options.",
      href: "/treatments?category=injectables",
    },
    {
      title: "Men's Hormone Panel",
      description: "At-home testing to establish baseline levels.",
      href: "/treatments/hormone-panel-male",
    },
  ],
  menopause: [
    {
      title: "Menopause Hormone Therapy",
      description: "Relief for hot flashes, sleep, and mood changes.",
      href: "/treatments/menopause-hrt",
    },
    {
      title: "Perimenopause Support",
      description: "Early intervention as hormone levels shift.",
      href: "/treatments?category=menopause",
    },
    {
      title: "Women's Hormone Panel",
      description: "Comprehensive at-home hormone testing.",
      href: "/treatments/hormone-panel-female",
    },
  ],
  weight: [
    {
      title: "Weight Management — Men",
      description: "Physician-guided support for sustainable results.",
      href: "/treatments/weight-men",
    },
    {
      title: "Weight Management — Women",
      description: "Programs designed around women's hormone health.",
      href: "/treatments/weight-women",
    },
    {
      title: "Metabolic Lab Panel",
      description: "Testing to inform your treatment plan.",
      href: "/treatments?category=lab-testing",
    },
  ],
  thyroid: [
    {
      title: "Thyroid Assessment",
      description: "Evaluate thyroid function and hormone balance.",
      href: "/treatments/thyroid-test",
    },
    {
      title: "Thyroid + Hormone Panel",
      description: "Combined testing for a fuller picture.",
      href: "/treatments?category=lab-testing",
    },
    {
      title: "Provider Consultation",
      description: "Review results with a licensed physician.",
      href: "/#how-it-works",
    },
  ],
  "lab-testing": [
    {
      title: "Male Hormone Panel",
      description: "Testosterone, SHBG, and related markers.",
      href: "/treatments/hormone-panel-male",
    },
    {
      title: "Female Hormone Panel",
      description: "Estrogen, progesterone, and thyroid markers.",
      href: "/treatments/hormone-panel-female",
    },
    {
      title: "Thyroid Panel",
      description: "TSH, T3, T4, and antibody testing.",
      href: "/treatments/thyroid-test",
    },
  ],
};
