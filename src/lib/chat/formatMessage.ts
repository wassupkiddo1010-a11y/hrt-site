/**
 * Converts AI markdown-ish replies into clean plain text for chat display.
 */
export function formatChatMessage(content: string): string {
  let text = content.trim();

  const jsonStart = text.search(/\{\s*"message"\s*:/);
  if (jsonStart > 0) {
    text = text.slice(0, jsonStart).trim();
  }

  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[*-]\s+/gm, "• ")
    .replace(/(?<!\S)\*(?!\s)(.+?)(?<!\s)\*(?!\S)/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function splitChatParagraphs(content: string): string[] {
  return formatChatMessage(content)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
