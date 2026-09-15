import { pieceClass } from "./slots.js";

const SYSTEM = `You write camera prompts for photorealistic pictures of handmade woodwork from a small furniture shop. The visitor filled a brief. Use the piece class to choose the shot: wall objects (picture frames, mirrors) hang or lean in the named room and show a thin profile; lamps and lights stand in the room with a wood stem and shade; tables and desks sit in the room as furniture; seating shows stance and joinery; storage shows doors, shelves, or casework; beds show the frame, not bedding drama.

Describe wood grain, color, finish, and sheen in visual terms (for example natural plus glossy means a clear coat on natural wood, not a conflict). If they asked for visible joinery, name it: miters on frames, through-tenons or exposed mortise-and-tenon on furniture. Translate priorities into look: uniqueness → distinctive handmade details; sustainability → solid wood, honest construction, no veneer; local craft → workshop-made, not catalog furniture.

Ignore budget, deadlines, URLs, and feelings as copy. Little or no chrome hardware. No people, no text, no logos, no watermarks. One paragraph, 50–90 words. Output only the prompt.`;

export async function rewritePrompt(sentence, slots, env) {
  if (!env.OPENAI_API_KEY) return null;

  const klass = pieceClass(slots.piece);
  const brief = {
    piece: slots.piece,
    pieceClass: klass,
    room: slots.room,
    purpose: slots.purpose,
    sizeInches: {
      length: slots.length,
      width: slots.width,
      height: slots.height,
    },
    style: slots.style,
    look: slots.look,
    wood: slots.wood,
    finish: slots.finish,
    sheen: slots.sheen,
    include: slots.include,
    avoid: slots.avoid,
    support: slots.support,
    wear: slots.wear,
    users: slots.users,
    like: slots.like,
    change: slots.change,
    priorities: slots.priorities,
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.35,
      max_tokens: 280,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Visitor description:\n"""${sentence}"""\n\nStructured slots:\n${JSON.stringify(brief)}`,
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
