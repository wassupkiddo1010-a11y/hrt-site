const data = $input.first().json;
const lead = data.leadData || {};

const historyLines = [];
if (lead.name) historyLines.push(`- Name: ${lead.name}`);
if (lead.email) historyLines.push(`- Email: ${lead.email}`);
if (lead.phone) historyLines.push(`- Phone: ${lead.phone}`);
if (lead.gender) historyLines.push(`- Gender pathway: ${lead.gender}`);
if (lead.state) historyLines.push(`- State: ${lead.state}`);
if (lead.symptoms?.length) historyLines.push(`- Symptoms noted: ${lead.symptoms.join(', ')}`);

if (lead.contactDeclined) {
  historyLines.push('- Contact: declined — support only, NEVER ask again');
} else if (lead.name && lead.email) {
  historyLines.push('- Contact: COMPLETE — NEVER ask for name or email again. Answer their question and share relevant links.');
} else if (lead.name && !lead.email) {
  historyLines.push('- Contact: have name — if asking once, request EMAIL ONLY');
} else if (!lead.name && lead.email) {
  historyLines.push('- Contact: have email — if asking once, request NAME ONLY');
} else if (lead.contactAsked) {
  historyLines.push('- Contact: already asked once — do NOT ask again, just answer their question');
} else {
  historyLines.push('- Contact: not yet collected — ask once after answering their first real question');
}

if (lead.symptomChecklistPrompted) historyLines.push('- Symptom checklist: already shared');
if (lead.portalPrompted) historyLines.push('- Portal: already shared');
if (lead.assistanceWith) {
  historyLines.push(`- Previous topic (only if they mention it): ${lead.assistanceWith}`);
}
if (lead.topic && lead.topic !== lead.assistanceWith) {
  historyLines.push(`- Previous topic detail: ${lead.topic}`);
}

historyLines.push(`- Message count: ${data.messageCount || 0}`);
historyLines.push(`- Current step: ${data.step || 'start'}`);
if ((data.messageCount || 0) > 0) {
  historyLines.push('- DO NOT use welcome-back greeting again — continue the conversation naturally');
}

const priorHistory = historyLines.length > 0
  ? historyLines.join('\n')
  : 'No data collected yet';

return [{
  json: {
    userMessage: data.userMessage,
    sessionId: data.sessionId,
    step: data.step,
    leadData: lead,
    pageUrl: data.pageUrl || '/',
    source: data.source || 'viltis-website',
    messageCount: data.messageCount || 0,
    symptomChecklistDone: data.symptomChecklistDone || false,
    portalRegistered: data.portalRegistered || false,
    isReturning: true,
    systemContext: 'RETURNING_VISITOR',
    priorHistory
  }
}];
