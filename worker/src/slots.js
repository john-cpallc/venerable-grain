export const SLOTS = {
  piece: [
    "dining table",
    "kitchen table",
    "coffee table",
    "side table",
    "bench",
    "cabinet",
    "bookshelf",
    "desk",
    "stool",
    "chair",
    "bed frame",
    "something else",
  ],
  room: [
    "kitchen",
    "dining room",
    "living room",
    "bedroom",
    "hallway",
    "office",
    "entry",
    "workshop",
    "somewhere else",
  ],
  purpose: [
    "eating meals",
    "working",
    "sitting",
    "storage",
    "display",
    "gathering",
    "something else",
  ],
  style: [
    "modern",
    "rustic",
    "farmhouse",
    "industrial",
    "traditional",
    "minimalist",
    "something else",
  ],
  look: ["simple", "cozy", "elegant", "clean", "rugged", "organic", "bold"],
  wood: [
    "walnut",
    "white oak",
    "cherry",
    "maple",
    "ash",
    "I’m not sure",
    "something else",
  ],
  finish: ["natural", "light", "medium", "dark", "painted", "reclaimed"],
  sheen: ["matte", "satin", "glossy"],
  include: [
    "drawers",
    "shelves",
    "storage",
    "cable management",
    "foldable parts",
    "wood joints you can see",
    "nothing extra",
  ],
  support: [
    "two people",
    "a family",
    "heavy objects",
    "daily bags and keys",
    "a computer and papers",
  ],
  wear: ["light", "moderate", "heavy"],
  users: ["adults", "children", "pets", "customers", "a mix"],
  budget: [
    "under $800",
    "$800–2,000",
    "$2,000–5,000",
    "$5,000 or more",
    "not sure yet",
  ],
  when: ["with no rush", "in a few months", "by a set date"],
  feel: ["at ease", "proud", "delighted", "grounded", "impressed"],
};

export const PRIORITIES = [
  "price",
  "appearance",
  "durability",
  "function",
  "uniqueness",
  "sustainability",
  "local craft",
  "easy care",
];

const OTHER_KEYS = {
  piece: "pieceOther",
  room: "roomOther",
  purpose: "purposeOther",
  style: "styleOther",
  wood: "woodOther",
};

const WORD = /^[A-Za-z0-9 ,.'’\-/:&]*$/;
const LINK = /^[A-Za-z0-9 ,.'’\-_/:?&=#.%]*$/;
const DIM = /^[0-9]{1,3}(\.[0-9])?$/;

const TEXTS = {
  pieceOther: { max: 40, re: WORD, optional: true },
  roomOther: { max: 40, re: WORD, optional: true },
  purposeOther: { max: 60, re: WORD, optional: true },
  styleOther: { max: 40, re: WORD, optional: true },
  woodOther: { max: 40, re: WORD, optional: true },
  length: { max: 8, re: DIM },
  width: { max: 8, re: DIM },
  height: { max: 8, re: DIM },
  avoid: { max: 80, re: WORD, optional: true },
  reference: { max: 120, re: LINK, optional: true },
  like: { max: 80, re: WORD, optional: true },
  change: { max: 80, re: WORD, optional: true },
  whenNote: { max: 40, re: WORD, optional: true },
  because: { max: 100, re: WORD, optional: true },
  links: { max: 200, re: LINK, optional: true },
};

function cleanText(raw, spec) {
  const value = String(raw || "").trim().slice(0, spec.max);
  if (!value) {
    if (spec.optional) return "";
    throw new Error("Fill in the size blanks.");
  }
  if (!spec.re.test(value)) {
    throw new Error("Use plain words or numbers in the blanks.");
  }
  return value;
}

function resolveChoice(select, other) {
  const needsOther =
    select === "something else" || select === "somewhere else";
  if (needsOther) {
    if (!other) throw new Error("Say what you mean by “something else.”");
    return other;
  }
  return select;
}

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

  for (const [key, spec] of Object.entries(TEXTS)) {
    slots[key] = cleanText(raw[key], spec);
  }

  for (const [selectKey, otherKey] of Object.entries(OTHER_KEYS)) {
    slots[selectKey] = resolveChoice(slots[selectKey], slots[otherKey]);
  }

  const incoming = Array.isArray(raw.priorities)
    ? raw.priorities.map((p) => String(p))
    : [];
  const unique = [];
  for (const p of incoming) {
    if (!PRIORITIES.includes(p)) {
      throw new Error("Pick priorities from the list.");
    }
    if (!unique.includes(p)) unique.push(p);
  }
  if (unique.length > 3) {
    throw new Error("Pick up to three priorities.");
  }
  slots.priorities = unique;
  return slots;
}

function joinList(items) {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function sentenceFromSlots(s) {
  const parts = [
    `I am looking for a ${s.piece} to use in my ${s.room}.`,
    `Its main purpose would be ${s.purpose}, and it should be about ${s.length} by ${s.width} by ${s.height} inches.`,
    `The style I prefer is ${s.style}, with a look that feels ${s.look}.`,
    `I am most interested in ${s.wood}, with a ${s.finish} finish and a ${s.sheen} sheen.`,
    `I would like it to include ${s.include}${s.avoid ? `, but I do not want ${s.avoid}` : ""}.`,
    `The piece needs to support ${s.support} and will get ${s.wear} use from ${s.users}.`,
  ];
  if (s.reference || s.like || s.change) {
    let ref = "The closest store-bought piece I have seen";
    ref += s.reference ? ` is ${s.reference}` : " is something I have in mind";
    if (s.like) ref += `; I like ${s.like}`;
    if (s.change) ref += `, but I would change ${s.change}`;
    ref += ".";
    parts.push(ref);
  }
  let timing = `My target budget is ${s.budget}, and I would need it ${s.when}`;
  if (s.whenNote) timing += ` (${s.whenNote})`;
  timing += ".";
  parts.push(timing);
  if (s.priorities.length) {
    parts.push(`The most important priorities are ${joinList(s.priorities)}.`);
  }
  let success = `A successful piece would make me feel ${s.feel}`;
  if (s.because) success += ` because it would ${s.because}`;
  success += ".";
  parts.push(success);
  if (s.links) parts.push(`Inspiration: ${s.links}.`);
  return parts.join(" ");
}

export function templatePrompt(s) {
  return [
    `Photorealistic product visualization of a handmade ${s.piece} for a ${s.room}, used for ${s.purpose}.`,
    `About ${s.length} by ${s.width} by ${s.height} inches.`,
    `${s.style} furniture with a ${s.look} look.`,
    s.wood === "I’m not sure"
      ? `Solid hardwood, ${s.finish} finish, ${s.sheen} sheen.`
      : `Solid ${s.wood}, ${s.finish} finish, ${s.sheen} sheen.`,
    s.include === "nothing extra" ? "" : `Includes ${s.include}.`,
    s.avoid ? `Do not include ${s.avoid}.` : "",
    `Built to support ${s.support}, ${s.wear} use by ${s.users}.`,
    s.like ? `Keep this quality: ${s.like}.` : "",
    s.change ? `Change this vs store-bought: ${s.change}.` : "",
    `Quiet interior, joinery over hardware, little or no chrome, no people, no text, no watermark, no logo.`,
  ]
    .filter(Boolean)
    .join(" ");
}
