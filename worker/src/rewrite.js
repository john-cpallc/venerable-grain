import { pieceClass, shopDefaultPath, templatePrompt } from "./slots.js";

const SYSTEM_BASE = `You write one camera prompt for a handmade piece. First invent ONE specific, buildable structural idea that matches the brief (stance, joinery, shade, or proportion) — not a store silhouette. Then photograph that idea.

Keep every visual fact from the workshop draft, especially “as written” text and the shade. Do not drop custom include/support. Mixed honest materials are welcome: wood first, then metal, earth, fabric, or leather when the brief asks.

Lamps: if a shade is named, lead with it. Wood species, finish, and sheen apply only to the base and stem. Never a wooden mushroom shade when they asked for glass, fabric, paper, or metal. Stained glass needs colored panels, lead came, and light through the glass. Socket, cord, and lead came are allowed. Do not write “no metal” for those shades.

Use the camera hint in the draft, or pick a more interesting one. Do not default to a generic catalog three-quarter product shot.

If risk is high, take a bigger formal risk (asymmetric, unexpected stance, a single bold joint) that a small shop could still make from wood, metal, earth, fabric, or leather. No chrome blobs, no CNC sci-fi, no people, no text, no logos, no watermarks.

Ignore budget, deadlines, and URLs. One paragraph, 70–110 words. Output only the prompt.`;

const SYSTEM_SHOP = `${SYSTEM_BASE}

This visitor left the shop’s landing defaults. The idea must match the shop: built for daily use, structure you can see, few cuts, joinery over hardware, unmolested or upcycled wood. For tables, seating, storage, and beds, prefer knockdown or few large parts so it can move. Do not add knockdown to lamps, frames, or boards. No glossy catalog furniture, no veneer, no chrome.`;

const SYSTEM_VISITOR = `${SYSTEM_BASE}

Follow the visitor’s style, look, material, finish, sheen, and include exactly. Do not correct them toward Shaker oak or a default walnut table.`;

export async function rewritePrompt(sentence, slots, env) {
  if (!env.OPENAI_API_KEY) return null;

  const klass = pieceClass(slots.piece);
  const shopDefault = shopDefaultPath(slots);
  const draft = templatePrompt(slots);
  const risky =
    Boolean(slots.unusual) || (slots.priorities || []).includes("uniqueness");
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
    unusual: Boolean(slots.unusual),
    risk: risky ? "high" : "medium",
    shopDefault,
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: risky ? 0.75 : 0.55,
      max_tokens: 360,
      messages: [
        { role: "system", content: shopDefault ? SYSTEM_SHOP : SYSTEM_VISITOR },
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
  return content.slice(0, 1400);
}
