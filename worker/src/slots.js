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
    "cutting board",
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
    "patio",
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
    "food prep",
    "something else",
  ],
  style: [
    "modern",
    "rustic",
    "farmhouse",
    "industrial",
    "traditional",
    "minimalist",
    "mid-century",
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
  if (p === "cutting board" || /\bcutting board\b/.test(p)) {
    return {
      purpose: "food prep",
      include: "nothing extra",
      support: "heavy objects",
      dims: ["18", "12", "1"],
    };
  }
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

  const incoming = [];
  if (Array.isArray(raw.priorities)) {
    incoming.push(...raw.priorities.map((p) => String(p)));
  } else if (raw.priority) {
    incoming.push(String(raw.priority));
  }
  const unique = [];
  for (const p of incoming) {
    if (!p) continue;
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
  slots.unusual =
    raw.unusual === true ||
    raw.unusual === "true" ||
    raw.unusual === "on" ||
    raw.unusual === 1 ||
    raw.unusual === "1";
  return slots;
}

export function sentenceFromSlots(s) {
  const parts = [
    `I am looking for a ${s.piece} for my ${s.room}, to use for ${s.purpose}, about ${s.length} by ${s.width} by ${s.height} inches.`,
    `${s.style}, with a look that feels ${s.look}, in ${s.wood}, ${s.finish} finish, ${s.sheen} sheen.`,
  ];
  if (s.include && s.include !== "nothing extra") {
    parts.push(`Include ${s.include}.`);
  }
  if (s.avoid) parts.push(`Do not include ${s.avoid}.`);
  const klass = pieceClass(s.piece);
  const hold =
    klass === "wall" || klass === "lighting"
      ? `Meant to hold ${s.support}`
      : `Needs to support ${s.support}`;
  parts.push(`${hold}, ${s.wear} use by ${s.users}.`);
  if (s.budget && s.budget !== "not sure yet") {
    parts.push(`Budget ${s.budget}.`);
  }
  let timing = `Need it ${s.when}`;
  if (s.whenNote) timing += ` (${s.whenNote})`;
  timing += ".";
  parts.push(timing);
  if (s.reference || s.like || s.change) {
    let ref = "Closest store piece";
    ref += s.reference ? `: ${s.reference}` : "";
    if (s.like) ref += s.reference ? `. I like ${s.like}` : `: I like ${s.like}`;
    if (s.change) ref += `; I would change ${s.change}`;
    ref += ".";
    parts.push(ref);
  }
  if (s.priorities.length) {
    parts.push(`Most important: ${s.priorities[0]}.`);
  }
  if (s.unusual) {
    parts.push("Please take a design risk: a distinctive stance, not a catalog silhouette.");
  }
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
  const piece = String(s.piece || "").toLowerCase();
  const purpose = String(s.purpose || "").toLowerCase();
  const room = String(s.room || "").toLowerCase();
  if (klass === "wall") {
    return `hung or leaning in a quiet ${s.style} ${s.room}, used for ${s.purpose}, thin profile`;
  }
  if (klass === "lighting") {
    if (
      /desk|desktop|task|work/.test(purpose) ||
      room === "office"
    ) {
      return `a task lamp on an office desk lighting the work surface, not on a windowsill`;
    }
    return `standing in a quiet ${s.style} ${s.room}, used for ${s.purpose}`;
  }
  if (piece.includes("side table") || piece.includes("end table")) {
    return `a small occasional table beside a sofa or bed in a quiet ${s.style} ${s.room}, not a dining table, used for ${s.purpose}`;
  }
  if (piece.includes("coffee table")) {
    return `a low table in front of a sofa in a quiet ${s.style} ${s.room}, used for ${s.purpose}`;
  }
  return `in a quiet ${s.style} ${s.room}, used for ${s.purpose}`;
}

function loadLook(s, klass) {
  if (klass === "wall" || klass === "lighting") return "";
  const cues = {
    "two people": "scaled for two people, sturdy stance",
    "a family": "family-scale, sturdy construction",
    "heavy objects": "visibly sturdy, built to take weight",
    "daily bags and keys": "a landing place for daily things",
    "a computer and papers": "a work surface for a computer and papers",
    "a picture or artwork": "made to hold a picture or artwork",
    "a shade and bulb": "turned or faceted wood lamp with a simple shade",
  };
  const support = cues[s.support] || (s.support ? `made to hold ${s.support}` : "");
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

function asWritten(s, opts = {}) {
  const bits = [];
  const listed = (key) =>
    SLOTS[key].filter((x) => x !== "something else" && x !== "somewhere else");
  if (s.piece && !listed("piece").includes(s.piece)) {
    bits.push(`The piece is a ${s.piece}.`);
  }
  if (s.purpose && !listed("purpose").includes(s.purpose)) {
    bits.push(`Use, as written: ${s.purpose}.`);
  }
  if (s.style && !listed("style").includes(s.style)) {
    bits.push(`Style, as written: ${s.style}.`);
  }
  if (
    !opts.skipSupport &&
    s.support &&
    !listed("support").includes(s.support)
  ) {
    bits.push(`Holds or uses, as written: ${s.support}.`);
  }
  return bits.join(" ");
}

function shadeMaterial(s) {
  const include = String(s.include || "").trim();
  const support = String(s.support || "").trim();
  const includeIsShade =
    include &&
    include !== "nothing extra" &&
    include !== "wood joints you can see" &&
    /shade|lampshade|tiffany|stained\s*glass|leaded|mica|parchment|linen|fabric|paper|glass/i.test(
      include
    );
  if (includeIsShade) return include;
  if (support && support !== "a shade and bulb") return support;
  return "";
}

function shadeLook(s) {
  const shade = shadeMaterial(s);
  const low = shade.toLowerCase();
  if (!shade) {
    return "A separate cone, drum, or empire lampshade in paper, fabric, or glass — not a solid wood dome or mushroom cap.";
  }
  if (
    low.includes("stained glass") ||
    low.includes("tiffany") ||
    low.includes("leaded")
  ) {
    return `Dominant feature: a stained-glass lampshade (${shade}) of colored glass panels in dark lead came, a bulb glowing through the glass. The shade is glass only — not walnut, not maple, not a carved wooden dome, not a mushroom cap.`;
  }
  if (
    low.includes("fabric") ||
    low.includes("linen") ||
    low.includes("paper") ||
    low.includes("parchment")
  ) {
    return `The shade, as written: ${shade}. Cloth or paper, not carved from the same wood as the stem.`;
  }
  if (low.includes("metal") || low.includes("brass") || low.includes("copper")) {
    return `The shade, as written: ${shade}. Metal, not a wooden dome.`;
  }
  return `The shade, as written: ${shade}. The wooden base and stem are separate from the shade; do not sculpt them as one piece.`;
}

function lightingBodyLook(s) {
  const style = String(s.style || "").toLowerCase();
  if (style.includes("mid-century")) {
    return "Mid-century wooden base and tapered stem or tripod: angular, elegant, useful. Not a biomorphic one-piece sculpture.";
  }
  return "A distinct wooden base and stem, with a shade attached above.";
}

function wantsRisk(s) {
  return Boolean(s.unusual) || (s.priorities || []).includes("uniqueness");
}

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function cameraLook(s, klass) {
  const risky = wantsRisk(s);
  if (klass === "lighting") {
    return pickOne(
      risky
        ? [
            "Shade lit from within in a dim office, stem and base catching a little spill light.",
            "Tight three-quarter on where the shade meets the stem.",
            "Low desk-level view, the lamp as a sculptural object, not a catalog still life.",
          ]
        : [
            "On a desk in daylight, shade catching the window.",
            "Three-quarter on a desk, work surface suggested, not a windowsill.",
          ]
    );
  }
  if (klass === "wall") {
    return pickOne(
      risky
        ? [
            "Close on a corner joint, the rest of the frame falling away.",
            "Hung slightly off-center on a quiet wall, raking light on the grain.",
          ]
        : [
            "Hung on a quiet wall, natural interior light.",
            "Leaning, three-quarter, thin profile readable.",
          ]
    );
  }
  return pickOne(
    risky
      ? [
          "Low angle so the legs, stretchers, and understructure are the subject.",
          "Close three-quarter with one through-tenon or exposed joint sharp in the foreground.",
          "Finished prototype on a workshop bench, shavings soft in the background.",
          "Slightly overhead, showing how the top meets the legs.",
        ]
      : [
          "Three-quarter view, natural window light.",
          "Slightly low three-quarter so the stance of the legs reads.",
          "Quiet interior, the piece as the only subject.",
        ]
  );
}

function riskLook(s) {
  if (wantsRisk(s)) {
    return "One distinctive, buildable structural idea — not a catalog silhouette. An unexpected stance, a bold joint, or an off-center proportion is welcome if a small hardwood shop could make it.";
  }
  return "A considered handmade stance, not a generic store silhouette.";
}

function lightingPrompt(s) {
  const priorities = priorityLooks(s.priorities);
  const shade = shadeMaterial(s);
  const includeIsShade = shade && shade === String(s.include || "").trim();
  return [
    shadeLook(s),
    `Photograph of a ${s.style} ${s.piece}, ${sizeLook(s, "lighting")}.`,
    `${cameraLook(s, "lighting")}, ${settingLook(s, "lighting")}.`,
    `A look that feels ${s.look}.`,
    riskLook(s),
    lightingBodyLook(s),
    `${cap(woodLook(s.wood))} on the base and stem only; ${finishLook(s.finish, s.sheen)}. Wood does not continue into the shade.`,
    asWritten(s, { skipSupport: true }),
    includeIsShade ? "" : joineryLook(s.include, "lighting"),
    s.avoid ? `Do not include ${s.avoid}.` : "",
    s.wear === "heavy" ? "Built for daily use." : "",
    priorities.length ? `${cap(priorities.join("; "))}.` : "",
    s.like ? `Keep this quality: ${s.like}.` : "",
    s.change ? `Change this vs store-bought: ${s.change}.` : "",
    `A socket and power cord are fine. Lead came on a glass shade is fine. No chrome hardware on the wood. No people, no text, no watermark, no logo.`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function templatePrompt(s) {
  const klass = pieceClass(s.piece);
  if (klass === "lighting") return lightingPrompt(s);
  const load = loadLook(s, klass);
  const priorities = priorityLooks(s.priorities);
  return [
    `Photograph of a handmade ${s.piece}, ${sizeLook(s, klass)}.`,
    `${cameraLook(s, klass)}, ${settingLook(s, klass)}.`,
    `A look that feels ${s.look}.`,
    riskLook(s),
    `${cap(woodLook(s.wood))}; ${finishLook(s.finish, s.sheen)}.`,
    joineryLook(s.include, klass),
    asWritten(s),
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
