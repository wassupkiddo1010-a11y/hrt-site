"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { ChatLink } from "@/lib/chat/links";
import { isExternalChatLink, toRouterHref } from "@/lib/chat/links";

interface ChatLinkButtonProps {
  link: ChatLink;
  onNavigate?: () => void;
}

export default function ChatLinkButton({ link, onNavigate }: ChatLinkButtonProps) {
  const router = useRouter();
  const external = link.external || isExternalChatLink(link.href);
  const className =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-deep px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

  if (external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => onNavigate?.()}
      >
        {link.label}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();
        router.push(toRouterHref(link.href));
      }}
    >
      {link.label}
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
