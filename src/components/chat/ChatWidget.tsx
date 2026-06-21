"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ChatMessageContent from "@/components/chat/ChatMessageContent";
import {
  getDefaultSessionState,
  loadChatSession,
  saveChatSession,
  updateConversationState,
} from "@/lib/chat/session";
import { extractChatLinks, mergeChatLinks } from "@/lib/chat/links";
import type { ChatApiResponse, ChatMessage, ChatSessionState } from "@/lib/chat/types";

function createMessage(
  role: ChatMessage["role"],
  content: string,
  links?: ChatMessage["links"]
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: Date.now(),
    links,
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSessionState>(() =>
    typeof window === "undefined" ? getDefaultSessionState() : loadChatSession()
  );
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveChatSession(session);
  }, [session]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, error]);

  async function sendMessage(message: string) {
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sessionId: session.sessionId,
          conversationState: session.conversationState,
          pageUrl: window.location.pathname + window.location.search,
        }),
      });

      const data = (await response.json()) as ChatApiResponse & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message.");
      }

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          data.response,
          mergeChatLinks(
            extractChatLinks(data.response, data.getStartedUrl ? [data.getStartedUrl] : [])
          )
        ),
      ]);
      setSession((current) => updateConversationState(current, data.conversationState));
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isSending) {
      return;
    }

    setInput("");
    setMessages((current) => [...current, createMessage("user", trimmed)]);
    await sendMessage(trimmed);
  }

  function toggleChat() {
    setIsOpen((open) => !open);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-[90] flex h-[min(640px,calc(100vh-7rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
            aria-label="HRT.org chat assistant"
          >
            <header className="flex items-center justify-between border-b border-border bg-navy-deep px-4 py-3 text-white">
              <div>
                <p className="font-serif text-lg leading-tight">HRT.org Assistant</p>
                <p className="text-xs text-white/75">Support & care guidance</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="rounded-2xl border border-border bg-bg-subtle px-4 py-3 text-sm leading-relaxed text-text-muted">
                  Ask about treatments, lab testing, men&apos;s or women&apos;s care, or how to get started.
                </div>
              ) : null}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-navy-deep text-white"
                        : "border border-border bg-bg-subtle text-text"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ChatMessageContent
                        content={message.content}
                        links={message.links}
                        onNavigate={() => setIsOpen(false)}
                      />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}

              {isSending ? (
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Assistant is typing...
                </div>
              ) : null}

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>

            <form onSubmit={handleSend} className="border-t border-border p-4">
              <div className="flex items-end gap-2">
                <label className="sr-only" htmlFor="chat-input">
                  Message
                </label>
                <textarea
                  id="chat-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy disabled:cursor-not-allowed disabled:bg-bg-subtle"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep text-white transition-colors hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
                Educational guidance only — not medical advice. For emergencies, call 911.
              </p>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-[90] inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-deep text-white shadow-soft transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
