const data = $input.first().json;

return [{
  json: {
    response: data.aiMessage,
    getStartedUrl: null,
    conversationState: {
      step: data.nextStep,
      leadData: data.leadData || {},
      isHotLead: data.isHotLead || false,
      getStartedReady: data.getStartedReady || false,
      leadSaved: Boolean(data.shouldSaveLead) || Boolean(data.leadData?.leadSaved) || false,
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
