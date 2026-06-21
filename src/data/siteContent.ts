/* Real HRT.org homepage content — mapped to new design sections */

export const contact = {
  email: "info@hrt.org",
  phone: "888 574 5524",
  states: "Telehealth services currently available in Florida and California",
};

export const hero = {
  headline: "Personalized Hormone Health, Guided by Science",
  subheadline:
    "HRT is modern healthcare for men and women. Provider-guided therapy, at-home testing, and treatment options tailored to your goals.",
  trust: ["HIPAA Compliant", "Licensed Providers", "At-Home Testing"],
};

export const genderPathways = {
  men: {
    title: "For Men",
    description:
      "Support energy, strength, libido, focus, and recovery with personalized testosterone and hormone care.",
    cta: "Explore Men's Care",
    href: "/treatments?category=men",
  },
  women: {
    title: "For Women",
    description:
      "Ease menopause and andropause symptoms. Virtual care with board-certified physicians for prescription therapy.",
    cta: "Explore Women's Care",
    href: "/treatments?category=women",
  },
};

export const serviceCategories = [
  {
    title: "Hormone Replacement Therapy",
    description:
      "Ease the pain and discomfort of menopause or andropause. Meet virtually with a board-certified physician for HRT treatment options.",
    tags: ["Sleep", "Mood", "Memory", "Sexual Health", "Hot Flashes", "Weight Gain", "Energy"],
    href: "/treatments?category=hrt",
    menHref: "/treatments?category=hrt&gender=men",
    womenHref: "/treatments?category=hrt&gender=women",
    image: "/images/services/hrt.png",
    imageAlt: "Active couple enjoying vitality through hormone replacement therapy",
  },
  {
    title: "Peptide Therapy",
    description:
      "Support for the aging process through prescription peptide therapy. Oral and injectable formulas, delivered to your door.",
    tags: ["Muscle Mass", "Skin Elasticity", "Libido", "Fat Loss", "Immune Function", "Flexibility"],
    href: "/treatments?category=peptides",
    menHref: "/treatments?category=peptides&gender=men",
    womenHref: "/treatments?category=peptides&gender=women",
    image: "/images/services/peptides.png",
    imageAlt: "Athletic woman running, representing peptide therapy and recovery",
  },
  {
    title: "Weight Management",
    description:
      "Lose weight and maintain a healthy BMI through a customized program with physician-guided pharmaceutical support.",
    tags: ["Mobility", "Insulin Resistance", "Blood Pressure", "Heart Health", "Mood"],
    href: "/treatments?category=weight",
    menHref: "/treatments?category=weight&gender=men",
    womenHref: "/treatments?category=weight&gender=women",
    image: "/images/services/weight-loss.png",
    imageAlt: "Woman celebrating successful weight management results",
  },
  {
    title: "Sexual Health",
    description:
      "Restore intimacy through customized compounded pharmaceutical treatment. Regain function with licensed provider support.",
    tags: ["Libido", "Erectile Function", "Stamina", "Comfort", "Intimacy"],
    href: "/treatments?category=sexual-health",
    menHref: "/treatments?category=sexual-health&gender=men",
    womenHref: "/treatments?category=sexual-health&gender=women",
    image: "/images/services/sexual-health.png",
    imageAlt: "Happy couple sharing an affectionate moment at home",
  },
  {
    title: "Hair Loss",
    description:
      "Prescription hair loss treatment and topical medication. Work with a licensed practitioner to build your regimen.",
    tags: ["Hair Growth", "Density", "Thickness", "Pattern Hair Loss"],
    href: "/treatments?category=hair-loss",
    menHref: "/treatments?category=hair-loss&gender=men",
    womenHref: "/treatments?category=hair-loss&gender=women",
    image: "/images/services/hair-loss.png",
    imageAlt: "Man examining hairline concerns with a mirror",
  },
  {
    title: "Lab Testing",
    description:
      "Test discreetly from home. Order online through a secure portal and receive kits delivered to your door.",
    tags: ["Menopause", "Thyroid", "Heart Health", "Prostate", "Adrenal", "Fertility", "Sleep"],
    href: "/treatments?category=lab-testing",
    menHref: "/treatments?category=lab-testing",
    womenHref: "/treatments?category=lab-testing",
    image: "/images/services/lab-testing.png",
    imageAlt: "Clinical laboratory professional processing test samples",
  },
];

export const carePathways = {
  heading: "Care Pathways for Men and Women",
  subtitle:
    "Choose a personalized path based on your goals, symptoms, and provider guidance.",
  men: {
    title: "For Men",
    description:
      "Personalized care for energy, strength, libido, focus, recovery, and long-term hormone health.",
    cta: "Explore Men's Care",
    href: "/treatments?category=men",
    image: "/images/product-men.png?v=3",
    imageAlt: "HRT Lab personalized hydration cream for men",
    pathways: [
      { label: "Testosterone Support", href: "/treatments?category=hrt&gender=men", icon: "activity" as const },
      { label: "Weight Management", href: "/treatments?category=weight&gender=men", icon: "scale" as const },
      { label: "Peptide Therapy", href: "/treatments?category=peptides&gender=men", icon: "flask" as const },
      { label: "Sexual Health", href: "/treatments?category=sexual-health&gender=men", icon: "heart" as const },
      { label: "Hair Loss Support", href: "/treatments?category=hair-loss&gender=men", icon: "scan" as const },
      { label: "Lab Testing", href: "/treatments?category=lab-testing", icon: "testTube" as const },
    ],
  },
  women: {
    title: "For Women",
    description:
      "Personalized care for balance, hot flashes, mood, sleep, libido, metabolism, and overall wellness.",
    cta: "Explore Women's Care",
    href: "/treatments?category=women",
    image: "/images/product-women.png?v=3",
    imageAlt: "HRT personalized replenishing cream for women",
    pathways: [
      {
        label: "Menopause & Perimenopause Care",
        href: "/treatments?category=hrt&gender=women",
        icon: "waves" as const,
      },
      { label: "Hormone Therapy", href: "/treatments?category=hrt&gender=women", icon: "pill" as const },
      { label: "Weight Management", href: "/treatments?category=weight&gender=women", icon: "scale" as const },
      { label: "Peptide Therapy", href: "/treatments?category=peptides&gender=women", icon: "flask" as const },
      { label: "Sexual Health", href: "/treatments?category=sexual-health&gender=women", icon: "heart" as const },
      { label: "Lab Testing", href: "/treatments?category=lab-testing", icon: "testTube" as const },
    ],
  },
};

export const deliveryOptions = [
  {
    title: "Hormone Creams",
    badges: ["Men", "Women"] as const,
    description: "Topical creams designed for personalized hormone support.",
    href: "/treatments?category=creams",
    image: "/images/product-men.png?v=3",
    imageAlt: "HRT compounded hormone cream product",
    imageFit: "contain" as const,
    imageBg: "bg-blue-soft/40",
    unoptimized: true,
  },
  {
    title: "Injectable Options",
    badges: ["Men", "Women"] as const,
    description: "Effective injectable treatments for targeted hormone support.",
    href: "/treatments?category=injectables",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=480&fit=crop&crop=center&q=85",
    imageAlt: "Medical vial for injectable hormone treatment",
    imageFit: "cover" as const,
    imageBg: "bg-blue-soft/50",
    unoptimized: false,
  },
  {
    title: "At-Home Hormone Test Kits",
    description: "Easy-to-use test kits with lab analysis and results.",
    href: "/treatments?category=lab-testing",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=480&fit=crop&crop=center&q=85",
    imageAlt: "At-home hormone test kit in a clinical lab setting",
    imageFit: "cover" as const,
    imageBg: "bg-blue-soft/50",
    unoptimized: false,
  },
  {
    title: "Ongoing Provider Support",
    description: "Continuous care and adjustments to keep you feeling your best.",
    href: "/#how-it-works",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=480&fit=crop&crop=top&q=85",
    imageAlt: "Licensed provider offering personalized hormone care",
    imageFit: "cover" as const,
    imageBg: "bg-blue-soft/50",
    unoptimized: false,
  },
];

export const symptoms = [
  "Low Energy",
  "Poor Sleep",
  "Brain Fog",
  "Mood Changes",
  "Weight Changes",
  "Low Libido",
  "Hot Flashes",
  "Poor Recovery",
];

export const whyChooseHrt = {
  title: "Why Choose HRT.org?",
  cards: [
    {
      title: "Science-Led Care",
      description:
        "Evidence-based treatments backed by the latest research and clinical expertise.",
      icon: "atom" as const,
    },
    {
      title: "Personalized to Your Biology",
      description:
        "Your plan is based on your labs, symptoms, and goals — not a one-size-fits-all approach.",
      icon: "dna" as const,
    },
    {
      title: "Convenient From Home",
      description: "Care designed for real life — from intake to delivery, all from home.",
      icon: "home" as const,
    },
  ],
};

export const testimonials = [
  {
    id: 1,
    quote:
      "Wonderful company to do my business with…Thank you guys so much …you've made a world of difference for me",
    name: "Verified Patient",
    role: "HRT Patient",
    company: "Florida",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
  },
  {
    id: 2,
    quote:
      "The test came quickly, was easy to understand the directions, return was easy, and received results that were easy to understand in a very timely manner. THANKS!",
    name: "S. Miller",
    role: "Lab Testing Patient",
    company: "California",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
];

export const journal = [
  "Semaglutide for Weight Loss | Outcomes, Benefits and Side Effects",
  "Mastering Stress Management: How a Diurnal Cortisol Test Can Help",
  "The Hormone Estrogen: Types, Role, Functions, and Imbalance",
  "Hormonal Imbalance in Men—What's Really Happening?",
];

export const productKit = {
  men: { productLine: "Compounded Testosterone", formula: "Provider-guided" },
  women: { productLine: "Compounded Hormone Therapy", formula: "Bi-Est · Progesterone" },
};

export const footerDisclaimer =
  "HRT.org does not provide emergency medical care. The information on this site is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.";

export const footerSections = [
  {
    label: "Men",
    links: [
      { title: "Men's Care Overview", href: "/treatments?category=men" },
      { title: "Symptoms", href: "/#symptoms" },
      { title: "HRT for Men", href: "/treatments?category=hrt&gender=men" },
      { title: "Product Line", href: "/treatments?category=men" },
    ],
  },
  {
    label: "Women",
    links: [
      { title: "Women's Care Overview", href: "/treatments?category=women" },
      { title: "Symptoms", href: "/#symptoms" },
      { title: "HRT for Women", href: "/treatments?category=hrt&gender=women" },
      { title: "Product Line", href: "/treatments?category=women" },
    ],
  },
  {
    label: "Treatments",
    links: [
      { title: "Hormone Replacement", href: "/treatments?category=hrt" },
      { title: "Peptide Therapy", href: "/treatments?category=peptides" },
      { title: "Weight Management", href: "/treatments?category=weight" },
      { title: "Lab Testing", href: "/treatments?category=lab-testing" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "How It Works", href: "/#how-it-works" },
      { title: "The Journal", href: "/#resources" },
      { title: "Testimonials", href: "/#testimonials" },
      { title: "Contact Us", href: `mailto:${contact.email}` },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms & Conditions", href: "#" },
    ],
  },
];

export const footerSocial = [
  {
    title: "Facebook",
    href: "#",
    icon: "facebook" as const,
  },
  {
    title: "Instagram",
    href: "#",
    icon: "instagram" as const,
  },
  {
    title: "YouTube",
    href: "#",
    icon: "youtube" as const,
  },
  {
    title: "LinkedIn",
    href: "#",
    icon: "linkedin" as const,
  },
];
