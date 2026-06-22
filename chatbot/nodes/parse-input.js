const item = $input.first().json;
const body = item.body || item;

const message = body.message || body.chatInput || '';
const sessionId = body.sessionId || '';
const conversationState = body.conversationState || {};
const pageUrl = body.pageUrl || '/';
const source = body.source || 'viltis-website';

const step = conversationState.step || 'start';
const leadData = conversationState.leadData || {};
const messageCount = conversationState.messageCount || 0;
const symptomChecklistDone = conversationState.symptomChecklistDone || false;
const portalRegistered = conversationState.portalRegistered || false;
const isReturning =
  step !== 'start' || Object.keys(leadData).length > 0 || messageCount > 0;

return [
  {
    json: {
      userMessage: message,
      sessionId,
      step,
      leadData,
      pageUrl,
      source,
      isReturning,
      messageCount,
      symptomChecklistDone,
      portalRegistered,
      conversationState,
    },
  },
];
