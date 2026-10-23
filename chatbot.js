// Portfolio chatbot (Groq, llama-3.1-8b-instant).
//
// Two ways to reach the API, so the key never has to be in public code:
//   1. LOCAL: config.js has your key -> the browser calls Groq directly (class method).
//   2. LIVE (Vercel): config.js is not deployed (it is gitignored) -> the browser calls
//      /api/chat, a tiny server function that adds the key from an environment variable.

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");
const chatSend = document.getElementById("chatSend");

// config.js does not exist on the live site, so guard against it being undefined.
const chatConfig = typeof CONFIG !== "undefined" ? CONFIG : {};
const GROQ_URL = (chatConfig.baseUrl || "https://api.groq.com/openai/v1") + "/chat/completions";
const GROQ_MODEL = chatConfig.model || "llama-3.1-8b-instant";
const hasLocalKey = Boolean(chatConfig.apiKey);

const chatHistory = []; // last few turns, so follow-up questions make sense

function buildSystemPrompt() {
  const p = PORTFOLIO;
  const clean = function (v) { return typeof v === "string" && v.trim() !== "" && v.indexOf("[[FILL") === -1 ? v : "not provided"; };
  const projectLines = p.projects.map(function (project, index) {
    const links = project.links
      .filter(function (l) { return /^https?:\/\//i.test(l.url) && l.url.indexOf("[[FILL") === -1; })
      .map(function (l) { return l.label + ": " + l.url; })
      .join("; ");
    return (index + 1) + ". " + project.title + " - " + project.description +
      " Technologies: " + project.tech.join(", ") + "." + (links ? " Links: " + links : "");
  });
  const skillLines = Object.keys(p.skills).map(function (group) {
    return group + ": " + p.skills[group].join(", ");
  });
  const edu = p.education.map(function (e) {
    return e.degree + " at " + e.institute + (e.period && e.period.indexOf("[[FILL") === -1 ? " (" + e.period + ")" : "");
  });

  return [
    "You are the assistant on " + p.name + "'s personal portfolio website. Answer visitors' questions about " + p.name + " and these projects, speaking in the third person.",
    "Use ONLY the facts below. Keep every reply under 60 words.",
    "If a question asks for a personal detail that is not listed below (age, address, marks, salary, family, etc.), say you don't know that detail instead of guessing.",
    "",
    "Name: " + p.name,
    "Role: " + p.role,
    "About: " + p.about.filter(function (t) { return t.indexOf("[[FILL") === -1; }).join(" "),
    "Education: " + edu.join("; "),
    "Skills - " + skillLines.join(" | "),
    "GitHub: " + clean(p.contact.github),
    "Email: " + clean(p.contact.email),
    "LinkedIn: " + clean(p.contact.linkedin),
    "",
    "Course journey (Code With AI): " + p.journey.map(function (s) { return s.season + " (" + s.episodes.map(function (e) { return e.title; }).join(", ") + ")"; }).join("; "),
    "",
    "Projects:",
    projectLines.join("\n")
  ].join("\n");
}

function showChatMessage(text, kind) {
  const p = document.createElement("p");
  p.className = kind === "user" ? "user-message" : "bot-message";
  p.textContent = text;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function errorMessageFor(status) {
  if (status === 401) return "The chatbot's API key was rejected (401). Check the key.";
  if (status === 429) return "Too many requests (429). Please wait a moment and try again.";
  if (status === 404) return "The chatbot service was not found (404). If you are testing locally, add your key to config.js.";
  if (status >= 500) return "The AI service had a problem (HTTP " + status + "). Please try again soon.";
  return "The request failed (HTTP " + status + ").";
}

async function askGroq(messages) {
  const systemPrompt = buildSystemPrompt();

  if (hasLocalKey) {
    return fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + chatConfig.apiKey
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: 150,
        messages: [{ role: "system", content: systemPrompt }].concat(messages)
      })
    });
  }

  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: systemPrompt, messages: messages })
  });
}

chatForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) {
    chatStatus.textContent = "Please type a question.";
    return;
  }

  showChatMessage(question, "user");
  chatInput.value = "";
  chatSend.disabled = true;
  chatStatus.textContent = "Thinking...";

  chatHistory.push({ role: "user", content: question });
  const recent = chatHistory.slice(-6);

  try {
    const response = await askGroq(recent);
    if (!response.ok) {
      throw new Error(errorMessageFor(response.status));
    }
    const data = await response.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : "";
    const text = reply || "No reply received.";
    chatHistory.push({ role: "assistant", content: text });
    showChatMessage(text, "bot");
    chatStatus.textContent = "";
  } catch (error) {
    chatHistory.pop(); // drop the question that failed so history stays clean
    chatStatus.textContent = error instanceof TypeError
      ? "Chat unavailable. Network error: check your internet connection."
      : "Chat unavailable. " + error.message;
    console.error("Chatbot error:", error);
  } finally {
    chatSend.disabled = false;
    chatInput.focus();
  }
});
