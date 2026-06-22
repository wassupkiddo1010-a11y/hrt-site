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

let clean = raw.trim();
if (clean.startsWith('```')) {
  clean = clean.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
}

let parsed;
try {
  parsed = JSON.parse(clean);
} catch (error) {
  parsed = {
    message: raw,
    nextStep: context.step || 'start',
    leadData: {},
    isHotLead: false,
    getStartedReady: false
  };
}

const existingLeadData = context.leadData || {};
const newLeadData = parsed.leadData || {};
const mergedLeadData = { ...existingLeadData };
const userMessage = (context.userMessage || '').trim();
const previousStep = context.step || 'start';

Object.keys(newLeadData).forEach((key) => {
  const val = newLeadData[key];
  if (val !== '' && val !== null && val !== undefined) {
    mergedLeadData[key] = val;
  }
});

const emailInMessage = userMessage.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/);
if (emailInMessage && !mergedLeadData.email) {
  mergedLeadData.email = emailInMessage[0];
}

const refusalPattern = /\b(no thanks|not interested|don't want|do not want|prefer not|rather not|skip|without sharing|won't share|no email|pass on that|just browsing|not comfortable|won't give|i'd rather not|rather not share)\b/i;
if (refusalPattern.test(userMessage) && !(mergedLeadData.name && mergedLeadData.email)) {
  mergedLeadData.contactDeclined = true;
}

const topicDismissPattern = /\b(not looking for|not interested in|not today)\b/i;
if (topicDismissPattern.test(userMessage)) {
  if (newLeadData.topic) {
    mergedLeadData.topic = newLeadData.topic;
  } else {
    delete mergedLeadData.topic;
    delete mergedLeadData.assistanceWith;
  }
}

const hasEmail = Boolean(mergedLeadData.email);
const hasName = Boolean(mergedLeadData.name);
const contactComplete = hasName && hasEmail;
const contactDeclined = Boolean(mergedLeadData.contactDeclined);
const wasContactAsked = Boolean(mergedLeadData.contactAsked);

let nextStep = parsed.nextStep || previousStep;
let getStartedReady = parsed.getStartedReady || false;

if (nextStep === 'collecting_contact') {
  mergedLeadData.contactAsked = true;
}

if (parsed.leadData?.contactAsked) {
  mergedLeadData.contactAsked = true;
}

if (wasContactAsked && !contactComplete && !contactDeclined && previousStep === 'collecting_contact') {
  const gavePartial = Boolean(emailInMessage) || Boolean(newLeadData.name) || Boolean(newLeadData.email);
  const isRefusal = refusalPattern.test(userMessage);
  if (!gavePartial && !isRefusal) {
    nextStep = 'completed';
    getStartedReady = false;
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

if (previousStep === 'completed') {
  nextStep = 'completed';
  getStartedReady = contactComplete;
}

if (getStartedReady && !contactComplete) {
  getStartedReady = false;
}

const messageCount = Math.max(
  Number(parsed.messageCount) || 0,
  (context.messageCount || 0) + 1
);

const shouldSaveLead =
  contactComplete &&
  nextStep === 'completed' &&
  previousStep === 'collecting_contact' &&
  Boolean(emailInMessage || newLeadData.name || newLeadData.email);

function formatPlainText(text) {
  if (!text) return '';
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[*-]\s+/gm, '• ')
    .replace(/(?<!\S)\*(?!\s)(.+?)(?<!\S)\*(?!\S)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

return [{
  json: {
    aiMessage: formatPlainText(parsed.message || ''),
    nextStep,
    leadData: mergedLeadData,
    isHotLead: parsed.isHotLead || false,
    getStartedReady,
    shouldSaveLead,
    messageCount,
    sessionId: context.sessionId || 'unknown-' + Date.now(),
    pageUrl: context.pageUrl || '/',
    source: context.source || 'viltis-website'
  }
}];
