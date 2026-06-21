import ChatLinkButton from "@/components/chat/ChatLinkButton";
import { splitChatParagraphs } from "@/lib/chat/formatMessage";
import type { ChatLink } from "@/lib/chat/links";
import { removeUrlsFromText } from "@/lib/chat/links";

interface ChatMessageContentProps {
  content: string;
  links?: ChatLink[];
  onNavigate?: () => void;
}

function renderParagraph(paragraph: string, index: number) {
  const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
  const isBulletList = lines.length > 0 && lines.every((line) => line.startsWith("• "));

  if (isBulletList) {
    return (
      <ul key={index} className="list-disc space-y-1 pl-4">
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>{line.replace(/^•\s*/, "")}</li>
        ))}
      </ul>
    );
  }

  return <p key={index}>{paragraph.replace(/\n/g, " ")}</p>;
}

export default function ChatMessageContent({ content, links = [], onNavigate }: ChatMessageContentProps) {
  const displayContent = removeUrlsFromText(content);
  const paragraphs = splitChatParagraphs(displayContent);

  return (
    <div className="space-y-3">
      {paragraphs.length > 0 ? <div className="space-y-2">{paragraphs.map(renderParagraph)}</div> : null}

      {links.length > 0 ? (
        <div className="space-y-2 pt-1">
          {links.map((link) => (
            <ChatLinkButton key={link.href} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
