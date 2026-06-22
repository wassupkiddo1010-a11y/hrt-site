const fs = require("fs");
const path = require("path");

const root = __dirname;
const wf = JSON.parse(fs.readFileSync(path.join(root, "hrt-chat-workflow.json"), "utf8"));

function setNodeCode(name, file) {
  wf.nodes.find((n) => n.name === name).parameters.jsCode = fs
    .readFileSync(path.join(root, "nodes", file), "utf8")
    .trim();
}

setNodeCode("Parse AI Response", "parse-ai-response.js");
setNodeCode("Build Final Response", "build-final-response.js");

let buildReturning = wf.nodes.find((n) => n.name === "Build Returning Context").parameters.jsCode;
if (!buildReturning.includes("contactAsked")) {
  wf.nodes.find((n) => n.name === "Build Returning Context").parameters.jsCode = buildReturning.replace(
    "if (lead.symptomChecklistPrompted)",
    "if (lead.contactAsked) historyLines.push('- Contact: already asked once — do NOT ask again unless missing partial field');\nif (lead.symptomChecklistPrompted)"
  );
}

const md = fs.readFileSync(path.join(root, "HRT_OPENAI_SYSTEM_PROMPT.md"), "utf8");
const match = md.match(/```\n([\s\S]*?)\n```/);
if (match) {
  wf.nodes.find((n) => n.name === "OpenAI Chat").parameters.responses.values[0].content = `=${match[1]}`;
}

fs.writeFileSync(path.join(root, "hrt-chat-workflow.json"), `${JSON.stringify(wf, null, 2)}\n`);
console.log("Workflow synced.");
