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
    "picture frame",
    "mirror",
    "lamp",
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
    "lighting",
    "sleeping",
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
    "pine",
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
    "something else",
  ],
  support: [
    "two people",
    "a family",
    "heavy objects",
    "daily bags and keys",
    "a computer and papers",
    "a picture or artwork",
    "a shade and bulb",
    "something else",
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
  include: "includeOther",
  support: "supportOther",
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
  includeOther: { max: 80, re: WORD, optional: true },
  supportOther: { max: 80, re: WORD, optional: true },
  length: { max: 8, re: DIM, optional: true },
  width: { max: 8, re: DIM, optional: true },
  height: { max: 8, re: DIM, optional: true },
  avoid: { max: 80, re: WORD, optional: true },
  reference: { max: 120, re: LINK, optional: true },
  like: { max: 120, re: LINK, optional: true },
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

const SLOT_DEFAULTS = {
  purpose: "display",
  look: "simple",
  sheen: "satin",
  include: "wood joints you can see",
  support: "a family",
  wear: "moderate",
  users: "adults",
  budget: "not sure yet",
  when: "with no rush",
  feel: "at ease",
};

function inferredForPiece(piece) {
  const p = String(piece || "").toLowerCase();
  if (p === "desk" || /^desk\b/.test(p)) {
    return {
      purpose: "working",
      include: "cable management",
      support: "a computer and papers",
      dims: ["60", "30", "30"],
    };
  }
  if (p === "coffee table" || p === "side table") {
    return {
      purpose: "display",
      include: "wood joints you can see",
      support: "daily bags and keys",
      dims: ["40", "22", "18"],
    };
  }
  const byClass = {
    table: {
      purpose: "eating meals",
      include: "wood joints you can see",
      support: "a family",
      dims: ["72", "36", "30"],
    },
    seating: {
      purpose: "sitting",
      include: "wood joints you can see",
      support: "two people",
      dims: ["48", "16", "18"],
    },
    storage: {
      purpose: "storage",
      include: "shelves",
      support: "heavy objects",
      dims: ["36", "14", "72"],
    },
    bed: {
      purpose: "sleeping",
      include: "wood joints you can see",
      support: "two people",
      dims: ["80", "60", "14"],
    },
    wall: {
      purpose: "display",
      include: "wood joints you can see",
      support: "a picture or artwork",
      dims: ["36", "24", "1"],
    },
    lighting: {
      purpose: "lighting",
      include: "wood joints you can see",
      support: "a shade and bulb",
      dims: ["10", "10", "22"],
    },
    other: {
      purpose: "display",
      include: "wood joints you can see",
      support: "heavy objects",
      dims: ["24", "18", "18"],
    },
  };
  return byClass[pieceClass(piece)] || byClass.other;
}

export function parseSlots(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Describe the piece using the line on the page.");
  }

  const slots = {};
  for (const key of Object.keys(SLOTS)) {
    let value = String(raw[key] || "").trim();
    if (!value) value = SLOT_DEFAULTS[key] || "";
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

  const inferred = inferredForPiece(slots.piece);
  if (!String(raw.purpose || "").trim()) slots.purpose = inferred.purpose;
  if (!String(raw.support || "").trim()) slots.support = inferred.support;
  if (!String(raw.include || "").trim()) slots.include = inferred.include;
  if (!slots.length) slots.length = inferred.dims[0];
  if (!slots.width) slots.width = inferred.dims[1];
  if (!slots.height) slots.height = inferred.dims[2];
  return slots;
}

export function sentenceFromSlots(s) {
  const parts = [
    `I am looking for a ${s.piece} for my ${s.room}, about ${s.length} by ${s.width} by ${s.height} inches.`,
    `${s.style}, in ${s.wood}, with a ${s.finish} finish and a ${s.sheen} sheen.`,
  ];
  if (s.include && s.include !== "nothing extra") {
    parts.push(`Include ${s.include}.`);
  }
  if (s.budget && s.budget !== "not sure yet") {
    parts.push(`Budget ${s.budget}.`);
  }
  if (s.like) parts.push(`Notes: ${s.like}.`);
  if (s.links && s.links !== s.like) parts.push(`Inspiration: ${s.links}.`);
  return parts.join(" ");
}

export function pieceClass(piece) {
  const p = String(piece || "").toLowerCase();
  if (/\b(picture frame|photo frame)\b/.test(p) || /\bmirror\b/.test(p)) {
    return "wall";
  }
  if (/\bframe\b/.test(p) && !/\bbed\b/.test(p)) return "wall";
  if (/\b(lamp|sconce|pendant|lantern|lighting)\b/.test(p) || /\blight\b/.test(p)) {
    return "lighting";
  }
  if (/\b(chair|bench|stool)\b/.test(p)) return "seating";
  if (/\b(cabinet|bookshelf|bookcase|sideboard)\b/.test(p)) return "storage";
  if (/\bbed\b/.test(p)) return "bed";
  if (/\b(table|desk)\b/.test(p)) return "table";
  return "other";
}

export function imageSizeFromSlots(s) {
  const length = parseFloat(s.length) || 0;
  const width = parseFloat(s.width) || 0;
  const height = parseFloat(s.height) || 0;
  const maxFace = Math.max(length, width);
  if (height > maxFace * 1.3) return "portrait_4_3";
  return "landscape_4_3";
}

function woodLook(wood) {
  const key = String(wood || "").toLowerCase();
  if (wood === "I’m not sure") {
    return "solid hardwood with honest, visible grain";
  }
  const looks = {
    pine: "light honey pine with visible grain and possible knots",
    walnut: "rich brown walnut with open grain",
    "white oak": "light white oak with prominent grain and ray fleck",
    cherry: "warm reddish cherry",
    maple: "pale even maple",
    ash: "light ash with bold grain",
  };
  return looks[key] || `solid ${wood} with honest grain`;
}

function finishLook(finish, sheen) {
  const sheenTxt =
    sheen === "matte"
      ? "matte sheen"
      : sheen === "satin"
        ? "satin sheen"
        : sheen === "glossy"
          ? "glossy sheen"
          : `${sheen} sheen`;
  if (finish === "natural") {
    return `clear coat showing the natural wood color, ${sheenTxt}`;
  }
  if (finish === "painted") return `painted finish, ${sheenTxt}`;
  if (finish === "reclaimed") {
    return `reclaimed character under a ${sheenTxt}`;
  }
  return `${finish} tone, ${sheenTxt}`;
}

function joineryLook(include, klass) {
  if (!include || include === "nothing extra") return "";
  if (include === "wood joints you can see") {
    return klass === "wall"
      ? "Visible mitered or through-joinery at the corners."
      : klass === "lighting"
        ? "Visible joinery on a turned or faceted wood stem."
        : "Visible through-tenons or exposed mortise-and-tenon joinery.";
  }
  return `Includes ${include}.`;
}

function sizeLook(s, klass) {
  if (klass === "wall") {
    return `about ${s.length} by ${s.width} inches and ${s.height} inch deep`;
  }
  return `about ${s.length} by ${s.width} by ${s.height} inches`;
}

function settingLook(s, klass) {
  if (klass === "wall") {
    return `hung or leaning in a quiet ${s.style} ${s.room}, used for ${s.purpose}, thin profile`;
  }
  if (klass === "lighting") {
    return `standing in a quiet ${s.style} ${s.room}, used for ${s.purpose}`;
  }
  return `in a quiet ${s.style} ${s.room}, used for ${s.purpose}`;
}

function loadLook(s, klass) {
  if (klass === "wall") return "";
  const cues = {
    "two people": "scaled for two people, sturdy stance",
    "a family": "family-scale, sturdy construction",
    "heavy objects": "visibly sturdy, built to take weight",
    "daily bags and keys": "a landing place for daily things",
    "a computer and papers": "a work surface for a computer and papers",
    "a picture or artwork": "made to hold a picture or artwork",
    "a shade and bulb": "turned or faceted wood lamp with a simple shade",
  };
  const support = cues[s.support] || "";
  const wear =
    s.wear === "heavy"
      ? "robust everyday wear"
      : s.wear === "light"
        ? "light use"
        : "";
  return [support, wear].filter(Boolean).join(", ") + (support || wear ? "." : "");
}

function priorityLooks(priorities) {
  const map = {
    uniqueness: "distinctive handmade details",
    sustainability: "solid wood, honest construction, no veneer",
    "local craft": "workshop-made, not catalog furniture",
    appearance: "careful proportions",
    durability: "lasting, robust construction",
    function: "clear useful form",
    "easy care": "simple wipeable surfaces",
  };
  return (priorities || []).map((p) => map[p]).filter(Boolean);
}

function cap(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function templatePrompt(s) {
  const klass = pieceClass(s.piece);
  const load = loadLook(s, klass);
  const priorities = priorityLooks(s.priorities);
  return [
    `Photorealistic product photo of a handmade ${s.piece}, ${sizeLook(s, klass)}.`,
    `Three-quarter view, natural interior light, ${settingLook(s, klass)}.`,
    s.look && s.look !== "simple" ? `A look that feels ${s.look}.` : "",
    `${cap(woodLook(s.wood))}; ${finishLook(s.finish, s.sheen)}.`,
    joineryLook(s.include, klass),
    s.avoid ? `Do not include ${s.avoid}.` : "",
    load,
    priorities.length ? `${cap(priorities.join("; "))}.` : "",
    s.like ? `Keep this quality: ${s.like}.` : "",
    s.change ? `Change this vs store-bought: ${s.change}.` : "",
    `Joinery over hardware, little or no chrome, no people, no text, no watermark, no logo.`,
  ]
    .filter(Boolean)
    .join(" ");
}
