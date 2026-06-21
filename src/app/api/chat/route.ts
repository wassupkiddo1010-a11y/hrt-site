import { NextResponse } from "next/server";

import type { ChatApiResponse, ChatRequestBody } from "@/lib/chat/types";

const CHAT_SOURCE = "viltis-website";

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Chat service is not configured. Set N8N_CHAT_WEBHOOK_URL." },
      { status: 503 }
    );
  }

  let body: Partial<ChatRequestBody>;

  try {
    body = (await request.json()) as Partial<ChatRequestBody>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "message is required." }, { status: 400 });
  }

  if (!body.sessionId) {
    return NextResponse.json({ error: "sessionId is required." }, { status: 400 });
  }

  const payload: ChatRequestBody = {
    message,
    sessionId: body.sessionId,
    conversationState: body.conversationState ?? {},
    source: CHAT_SOURCE,
    pageUrl: body.pageUrl ?? "/",
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const raw = await upstream.text();
    let parsed: unknown = raw;

    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { response: raw };
      }
    }

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: "Chat service returned an error.",
          status: upstream.status,
          details: parsed,
        },
        { status: 502 }
      );
    }

    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json(
        { error: "Chat service returned an invalid response.", details: parsed },
        { status: 502 }
      );
    }

    const data = parsed as Partial<ChatApiResponse>;
    const response =
      typeof data.response === "string"
        ? data.response.trim()
        : typeof (parsed as Record<string, unknown>).reply === "string"
          ? ((parsed as Record<string, unknown>).reply as string).trim()
          : null;

    if (!response) {
      return NextResponse.json(
        { error: "Chat service returned an empty response.", details: parsed },
        { status: 502 }
      );
    }

    const result: ChatApiResponse = {
      response,
      conversationState: data.conversationState ?? {},
      getStartedUrl: data.getStartedUrl ?? null,
      sessionId: payload.sessionId,
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to reach chat service.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}
