import type { ChatLink } from "@/lib/chat/links";

export interface ChatLeadData {
  name?: string;
  email?: string;
  phone?: string;
  assistanceWith?: string;
  topic?: string;
  gender?: string;
  state?: string;
  contactDeclined?: boolean;
}

export interface ConversationState {
  step?: string;
  leadData?: ChatLeadData;
  isHotLead?: boolean;
  getStartedReady?: boolean;
  leadSaved?: boolean;
}

export interface ChatRequestBody {
  message: string;
  sessionId: string;
  conversationState: ConversationState;
  source: "viltis-website";
  pageUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  links?: ChatLink[];
}

export interface ChatSessionState {
  sessionId: string;
  conversationState: ConversationState;
}

export interface ChatApiResponse {
  response: string;
  conversationState: ConversationState;
  getStartedUrl?: string | null;
  sessionId: string;
}
