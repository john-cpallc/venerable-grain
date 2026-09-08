export const SLOTS = {
  piece: [
    "bench",
    "dining table",
    "side table",
    "cabinet",
    "stool",
    "pedestal",
    "desk",
  ],
  wood: ["walnut", "white oak", "cherry", "maple", "ash", "old-growth fir"],
  size: ["compact", "for two", "for a family", "long and narrow"],
  room: ["kitchen", "dining room", "hallway", "studio", "porch", "bedroom"],
  line: ["Shaker", "Danish", "midcentury", "sashimono-inspired"],
  detail: [
    "through tenons",
    "breadboard ends",
    "fitted knockdown joints",
    "a live edge",
    "visible wedges",
  ],
  finish: ["oil", "soap", "ebonized", "natural"],
  light: ["a north window", "workshop lamps", "dusk", "soft overcast"],
};

const NOTE_RE = /^[A-Za-z0-9 ,.'’\-]*$/;

export function parseSlots(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Describe the piece using the line on the page.");
  }

  const slots = {};
  for (const key of Object.keys(SLOTS)) {
    const value = String(raw[key] || "");
    if (!SLOTS[key].includes(value)) {
      throw new Error("That line is not one of the shop’s options.");
    }
    slots[key] = value;
  }

  const note = String(raw.note || "").trim().slice(0, 80);
  if (note && !NOTE_RE.test(note)) {
    throw new Error("The extra note can only be plain words.");
  }
  slots.note = note;
  return slots;
}

export function sentenceFromSlots(s) {
  let line = `I want a ${s.piece} in ${s.wood}, ${s.size}, for a ${s.room}. The line is ${s.line}, with ${s.detail} and a ${s.finish} finish. Light from ${s.light}.`;
  if (s.note) line += ` ${s.note}.`;
  return line;
}

export function templatePrompt(s) {
  return [
    `Documentary photograph of a single handmade ${s.piece} in solid ${s.wood}, ${s.size}, made for a ${s.room}.`,
    `${s.line} furniture with ${s.detail} and a ${s.finish} finish.`,
    `Lit by ${s.light}. Solid hardwood, visible joinery, almost no metal hardware.`,
    `Quiet interior, natural materials, shallow depth of field, large-format film.`,
    `No people, no text, no watermark, no logo, no chrome fasteners.`,
    s.note ? `Also: ${s.note}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
