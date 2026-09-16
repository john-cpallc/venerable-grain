import { pieceClass, templatePrompt } from "./slots.js";

const SYSTEM = `You polish a workshop camera draft into one photorealistic image prompt. Keep every visual fact from the draft, especially anything marked “as written” and the shade description. Do not drop custom include/support text.

Lamps: open with the shade if the draft names one. Wood species, finish, and sheen apply only to the base and stem. Never describe a wooden, walnut, maple, or mushroom shade when the visitor asked for glass, fabric, paper, or metal. Stained glass / Tiffany / leaded shades need colored glass panels, visible lead came, and light through the glass. Lead came and a lamp socket are allowed. Do not write “no metal” or “no hardware” for those shades.

Office or desktop lamps sit on a desk. Wall objects hang or lean. A side table sits beside a sofa or bed, never as a dining table.

Ignore budget, deadlines, and URLs. No people, no text, no logos, no watermarks. One paragraph, 60–90 words. Output only the prompt.`;

export async function rewritePrompt(sentence, slots, env) {
  if (!env.OPENAI_API_KEY) return null;

  const klass = pieceClass(slots.piece);
  const draft = templatePrompt(slots);
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
      temperature: 0.2,
      max_tokens: 320,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Visitor description:\n"""${sentence}"""\n\nSlots:\n${JSON.stringify(brief)}\n\nWorkshop draft (keep these facts):\n"""${draft}"""`,
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
