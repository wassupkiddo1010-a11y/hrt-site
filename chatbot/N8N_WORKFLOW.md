# HRT.org Chatbot — Simple n8n Workflow

Same pattern as your Antonio Sales Training workflow: **every message → n8n → OpenAI → JSON response → widget**.

No RAG, no separate lead form on the website. The AI handles conversation + lead capture via `conversationState`.

**Production webhook:** `https://vmi3206755.contaboserver.net/webhook/hrt-chatbot`

---

## Flow diagram

```
Website widget
  POST { message, sessionId, conversationState }
       ↓
  /api/chat (Next.js proxy)
       ↓
  n8n Webhook (/webhook/hrt-chatbot)
       ↓
  Parse Input → If (new vs returning) → OpenAI (step-based prompt)
       ↓
  Parse AI Response → Build Final Response
       ↓                    ↓
  Respond to Webhook    Airtable (email + phone + getStartedReady)
       ↓
  { response, conversationState, getStartedUrl }
```

---

## 1. Website payload (every message)

```json
{
  "message": "What HRT options do you have for menopause?",
  "sessionId": "hrt-abc123",
  "conversationState": {
    "step": "start",
    "leadData": {},
    "isHotLead": false,
    "getStartedReady": false
  },
  "source": "viltis-website",
  "pageUrl": "/treatments?category=hrt"
}
```

First message: `conversationState` is `{}` or `{ "step": "start" }`.  
Every reply: widget saves `conversationState` from n8n into `localStorage` and sends it back on the next message.

---

## 2. n8n response (what widget expects)

```json
{
  "response": "HRT for menopause can ease hot flashes, sleep issues, and mood changes...",
  "getStartedUrl": null,
  "conversationState": {
    "step": "collecting_contact",
    "leadData": {
      "assistanceWith": "menopause HRT options",
      "topic": "menopause"
    },
    "isHotLead": false,
    "getStartedReady": false
  },
  "sessionId": "hrt-abc123"
}
```

When lead is complete (name + email + phone all collected):

```json
{
  "response": "Perfect, Sarah! You can continue asking questions here, or get started whenever you're ready.",
  "getStartedUrl": "/#get-started",
  "conversationState": {
    "step": "completed",
    "leadData": {
      "name": "Sarah Miller",
      "email": "sarah@email.com",
      "phone": "5551234567",
      "assistanceWith": "menopause HRT"
    },
    "isHotLead": true,
    "getStartedReady": true
  },
  "sessionId": "hrt-abc123"
}
```

---

## 3. Website env

`.env.local` (already configured in this repo):

```env
N8N_CHAT_WEBHOOK_URL=https://vmi3206755.contaboserver.net/webhook/hrt-chatbot
```

Restart dev server after changes: `npm run dev`

---

## 4. Import / update the n8n workflow

### Option A — Update live workflow (recommended, keeps your Airtable credentials)

1. **OpenAI Chat** → replace system prompt with contents from `chatbot/HRT_OPENAI_SYSTEM_PROMPT.md`
2. **Parse AI Response** → replace code with the version in `chatbot/hrt-chat-workflow.json` (includes `shouldSaveLead` — saves only once per session)
3. **Build Final Response** → replace code with the version in `chatbot/hrt-chat-workflow.json`
4. **If Lead Ready** → single condition: `{{ $json.shouldSaveLead }}` is true (remove email + getStartedReady checks)
5. Keep your existing **Save Lead** Airtable node as-is (upsert on `id` = sessionId)

### Option B — Re-import from JSON

1. Import `chatbot/hrt-chat-workflow.json`
2. Connect OpenAI + Airtable credentials
3. Set your Airtable base/table IDs in **Save Lead**
4. Activate and use production webhook URL above

---

## 5. Node reference

| Node | Purpose |
|------|---------|
| **Webhook** | POST `/hrt-chatbot`, response mode = responseNode |
| **Parse Input** | Normalizes body → step, leadData, sessionId |
| **If New Visitor** | `isReturning === false` → new visitor, else returning |
| **Set New Visitor Context** | systemContext = NEW_VISITOR |
| **Build Returning Context** | Builds priorHistory from leadData |
| **OpenAI Chat** | GPT-4o-mini, step-based JSON prompt |
| **Parse AI Response** | Parses JSON, merges leadData, enforces name+email gate |
| **Build Final Response** | Formats widget + Airtable payload |
| **If Lead Ready** | `shouldSaveLead` true (first completion only — prevents duplicates) |
| **Save Lead** | Airtable upsert (match on `id` = sessionId) |
| **Respond to Webhook** | Returns JSON to website |

---

## 6. Airtable columns

| Field | Map to | Notes |
|-------|--------|-------|
| **id** (match key) | `={{ $json.sessionId }}` | One row per chat session |
| **Name** | `={{ $json.leadData.name }}` | |
| **Email** | `={{ $json.leadData.email }}` | |
| **Phone Number** | `={{ $json.leadData.phone }}` | Optional — save if provided |

**Match on:** `id`  
**Operation:** Create or Update / Upsert  
**Save trigger:** `shouldSaveLead` — only when step moves from `collecting_contact` → `completed` with name + email. Follow-up messages do not re-save.

---

## 7. Conversation steps (AI-managed)

| Step | What happens |
|------|----------------|
| `start` | Welcome, invite question |
| `topic_captured` | Answer question, begin contact collection |
| `collecting_contact` | Collect name + email (phone optional if shared) |
| `completed` | Full support/sales Q&A, no re-asking contact |

**Completion gate:** `getStartedReady = true` when name and email are present. Phone is optional.

---

## 8. Test with curl

```bash
curl -X POST "https://vmi3206755.contaboserver.net/webhook/hrt-chatbot" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "hi",
    "sessionId": "test-001",
    "conversationState": {},
    "source": "viltis-website",
    "pageUrl": "/"
  }'
```

Full contact in one message:

```bash
curl -X POST "https://vmi3206755.contaboserver.net/webhook/hrt-chatbot" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "James Porter, james@test.com, 407-555-0199 — menopause help in Florida",
    "sessionId": "test-002",
    "conversationState": {
      "step": "collecting_contact",
      "leadData": { "assistanceWith": "menopause", "topic": "menopause" }
    },
    "source": "viltis-website",
    "pageUrl": "/treatments"
  }'
```

---

## 9. Google Sheets alternative

If not using Airtable, replace **Save Lead** with Google Sheets append. Columns:

| Timestamp | Session ID | Name | Email | Phone | Assistance With | Topic | State | Hot Lead | Source | Page URL |
|-----------|------------|------|-------|-------|-----------------|-------|-------|----------|--------|----------|

---

## 10. Checklist

- [x] Webhook live at `/webhook/hrt-chatbot`
- [x] `.env.local` configured in repo
- [ ] OpenAI prompt updated (name + email required; phone optional)
- [ ] Parse AI Response code updated (no phone gate)
- [ ] If Lead Ready checks email + getStartedReady only
- [ ] Airtable connected and matching on `id`
- [ ] Test: hi → question → name → email → phone → Airtable row
