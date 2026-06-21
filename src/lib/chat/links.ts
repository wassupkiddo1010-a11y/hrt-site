export interface ChatLink {
  href: string;
  label: string;
  external: boolean;
}

const URL_PATTERN = /(?:https?:\/\/[^\s<>"']+|\/[^\s<>"']+)/g;

const LINK_LABELS: Record<string, string> = {
  "/#get-started": "Get started",
  "/get-started": "Get started",
  "/treatments": "View treatments",
  "/": "Go to homepage",
};

function trimUrlPunctuation(url: string): string {
  return url.replace(/[.,!?;:)\]]+$/, "");
}

export function normalizeChatHref(rawHref: string): string {
  const href = trimUrlPunctuation(rawHref.trim());

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  if (href.startsWith("/")) {
    return href;
  }

  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
}

export function toRouterHref(href: string): string {
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return href;
  }

  if (typeof window === "undefined") {
    return href;
  }

  try {
    const url = new URL(href);
    if (url.origin === window.location.origin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return href;
  }

  return href;
}

export function isExternalChatLink(href: string): boolean {
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return false;
  }

  if (typeof window === "undefined") {
    return true;
  }

  try {
    const url = new URL(href);
    return url.origin !== window.location.origin;
  } catch {
    return true;
  }
}

export function getChatLinkLabel(href: string): string {
  const normalized = normalizeChatHref(href);
  const [path] = normalized.split("#");
  const pathOnly = path || normalized;

  if (LINK_LABELS[normalized]) {
    return LINK_LABELS[normalized];
  }

  if (LINK_LABELS[pathOnly]) {
    return LINK_LABELS[pathOnly];
  }

  const treatmentMatch = pathOnly.match(/^\/treatments\/([^/?#]+)$/);
  if (treatmentMatch) {
    const slug = treatmentMatch[1].replace(/-/g, " ");
    return `View ${slug}`;
  }

  if (normalized.includes("#get-started")) {
    return "Get started";
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    try {
      const url = new URL(normalized);
      if (url.hostname.includes("hrt.org") || url.hostname.includes("hrt.com")) {
        const internalPath = url.pathname + url.hash;
        return getChatLinkLabel(internalPath || "/");
      }
      return "Open link";
    } catch {
      return "Open link";
    }
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
    href,
    label: getChatLinkLabel(href),
    external: href.startsWith("http://") || href.startsWith("https://"),
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
