const data = $input.first().json;

return [{
  json: {
    response: data.aiMessage,
    getStartedUrl: data.shouldSaveLead ? 'https://portal.hrt.org/register' : null,
    conversationState: {
      step: data.nextStep,
      leadData: data.leadData || {},
      isHotLead: data.isHotLead || false,
      getStartedReady: data.getStartedReady || false,
      leadSaved: Boolean(data.shouldSaveLead) || false,
      messageCount: data.messageCount || 0,
      symptomChecklistDone: Boolean(data.leadData?.symptomChecklistPrompted) || false,
      portalRegistered: Boolean(data.leadData?.portalPrompted) || false
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
