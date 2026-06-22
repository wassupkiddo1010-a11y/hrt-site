export interface ChatLink {
  href: string;
  label: string;
  external: boolean;
}

const HRT_ORG_ORIGIN = "https://hrt.org";

const URL_PATTERN = /(?:https?:\/\/[^\s<>"']+|\/[^\s<>"']+)/g;

const LINK_LABELS: Record<string, string> = {
  "https://hrt.org": "Visit HRT.org",
  "https://portal.hrt.org/register": "Get started",
  "https://portal.hrt.org": "HRT Portal",
  "https://portal.hrt.org/app/symptoms-tracker": "Symptoms tracker",
  "https://hrt.org/lab-testing": "Lab testing",
  "https://store.hrt.org": "Shop test kits",
  "https://hrt.org/menopause": "Menopause care",
  "https://hrt.org/men/hormone-replacement-therapy": "Men's HRT",
  "https://hrt.org/women/hormone-replacement-therapy": "Women's HRT",
  "https://hrt.org/men/anti-aging-peptides": "Men's peptide therapy",
  "https://hrt.org/women/anti-aging-peptides": "Women's peptide therapy",
  "https://hrt.org/men/weight-loss-and-management": "Men's weight management",
  "https://hrt.org/women/weight-loss-and-management": "Women's weight management",
  "https://hrt.org/men/hair-loss": "Men's hair loss",
  "https://hrt.org/women/sexual-health": "Women's sexual health",
  "https://hrt.org/checklist/hormone-symptom-checklist-for-women-female-hormone-imbalance-test":
    "Female hormone checklist",
  "https://hrt.org/checklist/hormone-symptom-checklist-men": "Male hormone checklist",
  "https://hrt.org/checklist/menopause-assessment": "Menopause assessment",
  "https://hrt.org/checklist/perimenopause-assessment": "Perimenopause assessment",
  "https://hrt.org/checklist/andropause-assessment": "Andropause assessment",
  "https://hrt.org/checklist/thyroid-assessment": "Thyroid assessment",
  "https://hrt.org/checklist/adrenal-fatigue-stress-test": "Adrenal fatigue assessment",
  "https://hrt.org/checklist/pms-assessment": "PMS assessment",
  "https://hrt.org/checklist/osteoporosis-assessment": "Osteoporosis assessment",
  "/#get-started": "Get started",
  "/get-started": "Get started",
  "/treatments": "View treatments",
  "/": "Go to homepage",
};

function trimUrlPunctuation(url: string): string {
  return url.replace(/[.,!?;:)\]]+$/, "");
}

function isHrtDomain(hostname: string): boolean {
  return (
    hostname === "hrt.org" ||
    hostname.endsWith(".hrt.org") ||
    hostname === "hrt.com" ||
    hostname.endsWith(".hrt.com")
  );
}

export function resolveChatHref(rawHref: string): string {
  const href = trimUrlPunctuation(rawHref.trim());

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  if (href.startsWith("/")) {
    return `${HRT_ORG_ORIGIN}${href}`;
  }

  if (href.startsWith("#")) {
    return `${HRT_ORG_ORIGIN}/${href}`;
  }

  return href;
}

export function normalizeChatHref(rawHref: string): string {
  return resolveChatHref(rawHref);
}

export function toRouterHref(href: string): string {
  const resolved = resolveChatHref(href);

  if (!resolved.startsWith("http://") && !resolved.startsWith("https://")) {
    return resolved;
  }

  if (typeof window === "undefined") {
    return resolved;
  }

  try {
    const url = new URL(resolved);
    if (url.origin === window.location.origin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return resolved;
  }

  return resolved;
}

export function isExternalChatLink(href: string): boolean {
  const resolved = resolveChatHref(href);

  if (!resolved.startsWith("http://") && !resolved.startsWith("https://")) {
    return false;
  }

  if (typeof window === "undefined") {
    return true;
  }

  try {
    const url = new URL(resolved);
    return url.origin !== window.location.origin;
  } catch {
    return true;
  }
}

export function shouldNavigateAway(href: string): boolean {
  const resolved = resolveChatHref(href);

  if (!resolved.startsWith("http://") && !resolved.startsWith("https://")) {
    return false;
  }

  try {
    return isHrtDomain(new URL(resolved).hostname);
  } catch {
    return false;
  }
}

function labelFromChecklistPath(pathname: string): string | null {
  const slug = pathname.split("/").pop() ?? "";
  const labels: Record<string, string> = {
    "hormone-symptom-checklist-for-women-female-hormone-imbalance-test": "Female hormone checklist",
    "hormone-symptom-checklist-men": "Male hormone checklist",
    "menopause-assessment": "Menopause assessment",
    "perimenopause-assessment": "Perimenopause assessment",
    "andropause-assessment": "Andropause assessment",
    "thyroid-assessment": "Thyroid assessment",
    "adrenal-fatigue-stress-test": "Adrenal fatigue assessment",
    "pms-assessment": "PMS assessment",
    "osteoporosis-assessment": "Osteoporosis assessment",
  };

  return labels[slug] ?? null;
}

export function getChatLinkLabel(href: string): string {
  const normalized = normalizeChatHref(href);
  const resolved = resolveChatHref(normalized);
  const [path] = resolved.split("#");
  const pathOnly = path || resolved;

  if (LINK_LABELS[resolved]) {
    return LINK_LABELS[resolved];
  }

  if (LINK_LABELS[pathOnly]) {
    return LINK_LABELS[pathOnly];
  }

  if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
    try {
      const url = new URL(resolved);
      if (isHrtDomain(url.hostname)) {
        const checklistLabel = labelFromChecklistPath(url.pathname);
        if (checklistLabel) {
          return checklistLabel;
        }

        if (url.pathname.includes("register")) {
          return "Get started";
        }

        if (url.pathname.includes("symptoms-tracker")) {
          return "Symptoms tracker";
        }

        if (url.hostname.includes("store.")) {
          return "Shop test kits";
        }

        return getChatLinkLabel(url.pathname + url.hash || "/");
      }

      return "Open link";
    } catch {
      return "Open link";
    }
  }

  const treatmentMatch = pathOnly.match(/^\/treatments\/([^/?#]+)$/);
  if (treatmentMatch) {
    const slug = treatmentMatch[1].replace(/-/g, " ");
    return `View ${slug}`;
  }

  if (normalized.includes("#get-started") || resolved.includes("register")) {
    return "Get started";
  }

  return "Open page";
}

export function extractChatLinks(content: string, extraLinks: string[] = []): ChatLink[] {
  const found = new Set<string>();

  for (const match of content.matchAll(URL_PATTERN)) {
    const href = normalizeChatHref(match[0]);
    if (href.length > 1) {
      found.add(href);
    }
  }

  for (const href of extraLinks) {
    if (href) {
      found.add(normalizeChatHref(href));
    }
  }

  return Array.from(found).map((href) => ({
    href: resolveChatHref(href),
    label: getChatLinkLabel(href),
    external: isExternalChatLink(href),
  }));
}

export function removeUrlsFromText(content: string): string {
  return content
    .replace(URL_PATTERN, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function mergeChatLinks(...linkGroups: ChatLink[][]): ChatLink[] {
  const seen = new Set<string>();

  return linkGroups.flat().filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  });
}
