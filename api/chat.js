// Vercel serverless function: POST /api/chat
// Adds the secret Groq key (from the GROQ_API_KEY environment variable) so the key
// is never in the website's public files or on GitHub.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // 401 so the chatbot shows its "API key" message instead of failing silently
    return res.status(401).json({ error: "GROQ_API_KEY is not set on the server." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const system = typeof body.system === "string" ? body.system.slice(0, 6000) : "";
  const incoming = Array.isArray(body.messages) ? body.messages : [];

  // Only accept plain user/assistant turns, a few of them, each of limited length.
  const messages = incoming
    .filter(function (m) {
      return m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string";
    })
    .slice(-6)
    .map(function (m) {
      return { role: m.role, content: m.content.slice(0, 500) };
    });

  if (!system || messages.length === 0) {
    return res.status(400).json({ error: "Missing system prompt or messages." });
  }

  try {
    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 150,
        messages: [{ role: "system", content: system }].concat(messages)
      })
    });

    const data = await upstream.json().catch(function () { return {}; });
    // Pass Groq's status (e.g. 401, 429) through so the page can explain it.
    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: "Could not reach the AI service." });
  }
};
