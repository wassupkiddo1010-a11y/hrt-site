# Fix: Duplicate Airtable rows (Olivia / Marcus twice)

## Why it happened

**If Lead Ready** ran on **every** message where `email` + `getStartedReady` were true:

1. First message when lead completes → **Save #1**
2. Follow-up ("How do I get started?") → still `getStartedReady: true` → **Save #2**

Upsert on session `id` should merge these, but if Airtable creates instead of updates you get **two rows** with the same name.

## Fix: save only once per session

Add `shouldSaveLead` — true **only** when step moves:

`collecting_contact` → `completed`

Follow-up messages stay on `completed` and **do not** save again.

---

## 1. Parse AI Response — replace entire code

See `chatbot/hrt-chat-workflow.json` → **Parse AI Response** node, or copy from repo after pull.

Key addition at the end before `return`:

```javascript
const shouldSaveLead =
  getStartedReady &&
  contactComplete &&
  nextStep === 'completed' &&
  previousStep === 'collecting_contact';
```

And include `shouldSaveLead` in the returned `json` object.

---

## 2. Build Final Response — replace entire code

```javascript
const data = $input.first().json;

return [{
  json: {
    response: data.aiMessage,
    getStartedUrl: data.getStartedReady ? '/#get-started' : null,
    conversationState: {
      step: data.nextStep,
      leadData: data.leadData || {},
      isHotLead: data.isHotLead || false,
      getStartedReady: data.getStartedReady || false,
      leadSaved: Boolean(data.shouldSaveLead) || false
    },
    sessionId: data.sessionId || '',
    leadData: data.leadData || {},
    isHotLead: data.isHotLead || false,
    getStartedReady: data.getStartedReady || false,
    shouldSaveLead: data.shouldSaveLead || false,
    pageUrl: data.pageUrl || '/',
    source: data.source || 'viltis-website'
  }
}];
```

---

## 3. If Lead Ready — one condition only

Remove email + getStartedReady checks. Use **one** condition:

| Field | Value |
|-------|--------|
| Left | `{{ $json.shouldSaveLead }}` |
| Operator | is true |

---

## 4. Clean up Airtable

Delete duplicate test rows for Olivia Grant and Marcus Reed (keep one row per session `id`).

---

## 5. Verify

After updating n8n, run a test: complete a lead, then send 2 follow-up messages. You should get **exactly 1 row** per session ID.
