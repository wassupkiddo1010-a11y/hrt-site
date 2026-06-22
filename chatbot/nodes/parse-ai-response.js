const data = $input.first().json;

let context = {};
try {
  context = $('Set New Visitor Context').first().json;
} catch (error) {
  try {
    context = $('Build Returning Context').first().json;
  } catch (innerError) {
    context = {};
  }
}

let raw = '';
try {
  raw = data.output[0].content[0].text;
} catch (error) {
  throw new Error('Could not read OpenAI response: ' + JSON.stringify(data));
}

if (!raw) {
  throw new Error('Empty response from OpenAI');
}

function extractJsonFromText(text) {
  let clean = text.trim();

  if (clean.startsWith('```')) {
    clean = clean.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  try {
    return JSON.parse(clean);
  } catch (error) {
    // ignore
  }

  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');

  if (start !== -1 && end > start) {
    try {
      return JSON.parse(clean.slice(start, end + 1));
    } catch (error) {
      // ignore
    }
  }

  return null;
}

function extractEmail(text) {
  const match = text.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

function extractName(text) {
  const patterns = [
    /(?:my name is|name is|i am|i'm|this is|call me)\s+([a-zA-Z][a-zA-Z\s'-]{0,40})/i,
    /(?:^|\s)([a-zA-Z][a-zA-Z'-]{1,40})\s+[\w.+-]+@/,
    /^([a-zA-Z][a-zA-Z\s'-]{1,40}),?\s+[\w.+-]+@/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;

    let name = match[1]
      .trim()
      .replace(/\s+(?:and|email|phone|my|is)\b.*$/i, '')
      .trim();

    if (name.length < 2) continue;

    name = name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');

    return name;
  }

  return null;
}

function applyContactFromMessage(text, lead) {
  const email = extractEmail(text);
  const name = extractName(text);

  if (email) lead.email = email;
  if (name) lead.name = name;
}

function formatPlainText(text) {
  if (!text) return '';

  let output = text.trim();

  const jsonStart = output.search(/\{\s*"message"\s*:/);
  if (jsonStart > 0) {
    output = output.slice(0, jsonStart).trim();
  }

  return output
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[*-]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const parsedJson = extractJsonFromText(raw);
const previousStep = context.step || 'start';
const userMessage = (context.userMessage || '').trim();
const existingLeadData = context.leadData || {};
let conversationState = context.conversationState || {};
if (!conversationState || Object.keys(conversationState).length === 0) {
  try {
    conversationState = $('Parse Input').first().json.conversationState || {};
  } catch (error) {
    conversationState = {};
  }
}

let parsed;
if (parsedJson) {
  parsed = parsedJson;
} else {
  parsed = {
    message: formatPlainText(raw),
    nextStep: previousStep,
    leadData: {},
    isHotLead: false,
    getStartedReady: false,
  };
}

const newLeadData = parsed.leadData || {};
const mergedLeadData = { ...existingLeadData };

Object.keys(newLeadData).forEach((key) => {
  const val = newLeadData[key];
  if (val !== '' && val !== null && val !== undefined) {
    mergedLeadData[key] = val;
  }
});

applyContactFromMessage(userMessage, mergedLeadData);

const topicDismissPattern = /\b(not looking for|not interested in|not today)\b/i;
if (topicDismissPattern.test(userMessage)) {
  if (newLeadData.topic) {
    mergedLeadData.topic = newLeadData.topic;
  } else {
    delete mergedLeadData.topic;
    delete mergedLeadData.assistanceWith;
  }
}

const refusalPattern =
  /\b(no thanks|not interested|rather not|don't want to share|do not want to share|won't share|no email|pass on that|just browsing|not comfortable|won't give|i'd rather not)\b/i;

if (refusalPattern.test(userMessage) && !(mergedLeadData.name && mergedLeadData.email)) {
  mergedLeadData.contactDeclined = true;
}

const hasEmail = Boolean(mergedLeadData.email);
const hasName = Boolean(mergedLeadData.name);
const contactComplete = hasName && hasEmail;
const contactDeclined = Boolean(mergedLeadData.contactDeclined);
const wasContactAsked = Boolean(mergedLeadData.contactAsked);
const wasAlreadyComplete = Boolean(existingLeadData.name && existingLeadData.email);
const wasAlreadySaved = Boolean(conversationState.leadSaved);

let nextStep = parsed.nextStep || previousStep;
let getStartedReady = false;

if (nextStep === 'collecting_contact' || parsed.leadData?.contactAsked) {
  mergedLeadData.contactAsked = true;
}

if (wasContactAsked && !contactComplete && !contactDeclined && previousStep === 'collecting_contact') {
  const gaveContact = Boolean(extractEmail(userMessage) || extractName(userMessage));
  if (!gaveContact && !refusalPattern.test(userMessage)) {
    nextStep = 'completed';
  }
}

if (contactComplete) {
  nextStep = 'completed';
  getStartedReady = true;
}

if (contactDeclined) {
  nextStep = 'completed';
  getStartedReady = false;
}

if (previousStep === 'completed' && !contactComplete && !contactDeclined) {
  nextStep = 'completed';
}

const gotContactThisTurn =
  Boolean(extractEmail(userMessage)) ||
  Boolean(extractName(userMessage)) ||
  Boolean(newLeadData.name) ||
  Boolean(newLeadData.email);

const shouldSaveLead =
  contactComplete &&
  !wasAlreadySaved &&
  gotContactThisTurn &&
  nextStep === 'completed';

const messageCount = Math.max(Number(parsed.messageCount) || 0, (context.messageCount || 0) + 1);

let aiMessage = formatPlainText(parsed.message || parsed.response || '');

if (!aiMessage) {
  aiMessage = contactComplete
    ? `Thank you, ${mergedLeadData.name}! Our team has your details and can follow up if you need anything else.`
    : 'Happy to help — let me know if you have any other questions about hormone health or our services.';
}

return [
  {
    json: {
      aiMessage,
      nextStep,
      leadData: mergedLeadData,
      isHotLead: parsed.isHotLead || false,
      getStartedReady,
      shouldSaveLead,
      messageCount,
      sessionId: context.sessionId || 'unknown-' + Date.now(),
      pageUrl: context.pageUrl || '/',
      source: context.source || 'viltis-website',
    },
  },
];
