# Imagine worker

Serverless `/generate` endpoint for the Mad Libs sketch page. The Jekyll site stays on GitHub Pages; this Worker holds the API keys.

## One-time setup

1. Create a [fal.ai](https://fal.ai) account and copy an API key.
2. Optional: an OpenAI key so the filled sentence is rewritten before FLUX. Without it, a fixed workshop template is used.
3. Optional: a Cloudflare Turnstile widget. Put the site key in `_config.yml` (`imagine.turnstile_site_key`) and the secret here.

```bash
cd worker
cp .dev.vars.example .dev.vars
# edit .dev.vars

npx wrangler login
npx wrangler secret put FAL_KEY
# optional:
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put TURNSTILE_SECRET

npx wrangler deploy
```

The first deploy gives a `*.workers.dev` URL. This account uses `venerable-grain-imagine.vgimagine.workers.dev`. Put that URL in `_config.yml` as `imagine.api` (no trailing slash) until you attach the custom host.

## Custom host `imagine.venerablegrain.com`

Point the `venerablegrain.com` zone to Cloudflare DNS (or add a CNAME `imagine` → `venerable-grain-imagine.<account>.workers.dev` if your registrar allows CNAME flattening). Uncomment the `[[routes]]` block in `wrangler.toml` and deploy again. Keep `imagine.api` as `https://imagine.venerablegrain.com`.

## Local

```bash
cd worker
npx wrangler dev
```

Jekyll on `:4000` is already in `ALLOWED_ORIGINS`. Temporarily set `imagine.api` to `http://127.0.0.1:8787` while testing.

## Saved briefs

After a successful generate, the Worker writes a JSON file to the R2 bucket `venerable-grain-sketches`:

`briefs/YYYY-MM-DD/<uuid>.json`

Each file has `sentence` (the visitor paragraph), `slots`, `prompt` (what went to fal), and `at`. Browse it in the Cloudflare dashboard: **R2 → venerable-grain-sketches**. Create the bucket once:

```bash
npx wrangler r2 bucket create venerable-grain-sketches
```

