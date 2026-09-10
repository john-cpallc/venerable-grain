const SYSTEM = `You write camera prompts for photorealistic pictures of handmade furniture. The visitor filled a brief in everyday words. Use the piece, room, size, style, wood, finish, sheen, and features. Ignore budget, deadlines, and URLs. Little or no chrome hardware. No people, no text, no logos, no watermarks. One paragraph, 50–80 words. Output only the prompt.`;

export async function rewritePrompt(sentence, env) {
  if (!env.OPENAI_API_KEY) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.35,
      max_tokens: 220,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Visitor description:\n"""${sentence}"""`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rewrite failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Rewrite returned nothing.");
  return content.slice(0, 1200);
}
