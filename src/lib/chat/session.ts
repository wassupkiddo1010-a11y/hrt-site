import type { ChatSessionState, ConversationState } from "./types";

const SESSION_STORAGE_KEY = "hrt-chat-session";

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `hrt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getDefaultSessionState(): ChatSessionState {
  return {
    sessionId: createSessionId(),
    conversationState: {},
  };
}

export function loadChatSession(): ChatSessionState {
  if (typeof window === "undefined") {
    return getDefaultSessionState();
  }

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return getDefaultSessionState();
    }

    const parsed = JSON.parse(raw) as ChatSessionState;
    if (!parsed.sessionId) {
      return getDefaultSessionState();
    }

    return {
      sessionId: parsed.sessionId,
      conversationState: parsed.conversationState ?? {},
    };
  } catch {
    return getDefaultSessionState();
  }
}

export function saveChatSession(state: ChatSessionState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
}

export function updateConversationState(
  state: ChatSessionState,
  conversationState: ConversationState
): ChatSessionState {
  return {
    ...state,
    conversationState,
  };
}
