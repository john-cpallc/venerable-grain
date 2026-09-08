import { parseSlots, sentenceFromSlots, templatePrompt } from "./slots.js";
import { rewritePrompt } from "./rewrite.js";

const DAILY_CAP = 200;
const IP_DAILY_CAP = 20;
const COOLDOWN_MS = 15_000;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  const list = (env.ALLOWED_ORIGINS || "https://venerablegrain.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.includes(origin)) return origin;
  return null;
}

async function cacheCount(key, maxAgeSeconds) {
  const cache = caches.default;
  const req = new Request(`https://imagine-limit.internal/${key}`);
  const hit = await cache.match(req);
  const n = hit ? parseInt(await hit.text(), 10) || 0 : 0;
  return {
    n,
    async bump() {
      const next = n + 1;
      await cache.put(
        req,
        new Response(String(next), {
          headers: { "Cache-Control": `max-age=${maxAgeSeconds}` },
        })
      );
      return next;
    },
  };
}

class LimitError extends Error {
  constructor(message) {
    super(message);
    this.status = 429;
  }
}

class DrawError extends Error {
  constructor(message) {
    super(message);
    this.status = 502;
  }
}

async function enforceLimits(ip, env) {
  const day = new Date().toISOString().slice(0, 10);
  const globalCap = parseInt(env.DAILY_BUDGET || String(DAILY_CAP), 10);
  const global = await cacheCount(`day:${day}`, 90_000);
  if (global.n >= globalCap) {
    throw new LimitError("The shop has put the pencil down for today.");
  }
  const perIp = await cacheCount(`ip:${day}:${ip}`, 90_000);
  if (perIp.n >= IP_DAILY_CAP) {
    throw new LimitError("That’s enough sketches for today from here.");
  }
  const cool = await cacheCount(`cd:${ip}`, Math.ceil(COOLDOWN_MS / 1000));
  if (cool.n >= 1) {
    throw new LimitError("Give it a moment, then try again.");
  }
  await cool.bump();
  return async () => {
    await global.bump();
    await perIp.bump();
  };
}

async function verifyTurnstile(token, ip, env) {
  if (!env.TURNSTILE_SECRET) return;
  if (!token) throw new Error("Confirm you’re a person, then generate.");
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: token,
    remoteip: ip,
  });
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body }
  );
  const data = await res.json();
  if (!data.success) throw new Error("Confirm you’re a person, then generate.");
}

async function generateImage(prompt, env) {
  if (!env.FAL_KEY) {
    throw new DrawError("The sketch tool is not connected yet.");
  }
  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      Authorization: `Key ${env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: "landscape_4_3",
      num_images: 1,
      enable_safety_checker: true,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("fal error", res.status, text.slice(0, 300));
    throw new DrawError("The sketch did not come through.");
  }
  const data = await res.json();
  const url = data.images?.[0]?.url;
  if (!url) throw new DrawError("The sketch did not come through.");

  const img = await fetch(url);
  if (!img.ok) throw new DrawError("The sketch did not come through.");
  const buf = Buffer.from(await img.arrayBuffer());
  const type = img.headers.get("content-type") || "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
}

export default {
  async fetch(request, env) {
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return json({ ok: true, service: "venerable-grain-imagine" }, 200, origin || "*");
    }

    if (request.method !== "POST" || url.pathname !== "/generate") {
      return json({ error: "Not found." }, 404, origin || "*");
    }

    if (!origin) {
      return json({ error: "Forbidden." }, 403, "*");
    }

    try {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      let payload;
      try {
        payload = await request.json();
      } catch {
        throw new Error("Describe the piece using the line on the page.");
      }
      await verifyTurnstile(payload.turnstileToken || "", ip, env);
      const slots = parseSlots(payload.slots);
      const sentence = sentenceFromSlots(slots);
      const commitUsage = await enforceLimits(ip, env);

      let prompt = templatePrompt(slots);
      try {
        const rewritten = await rewritePrompt(sentence, env);
        if (rewritten) prompt = rewritten;
      } catch (err) {
        console.warn("rewrite skipped", err);
      }

      const imageUrl = await generateImage(prompt, env);
      await commitUsage();
      return json({ imageUrl, sentence }, 200, origin);
    } catch (err) {
      const status = err.status || 400;
      const message = err.message || "The sketch did not come through.";
      if (status >= 500) console.error(err);
      return json({ error: message }, status, origin);
    }
  },
};
