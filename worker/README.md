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

The first deploy gives a `*.workers.dev` URL. Put that URL in `_config.yml` as `imagine.api` (no trailing slash) until you attach the custom host.

## Custom host `imagine.venerablegrain.com`

Point the `venerablegrain.com` zone to Cloudflare DNS (or add a CNAME `imagine` → `venerable-grain-imagine.<account>.workers.dev` if your registrar allows CNAME flattening). Uncomment the `[[routes]]` block in `wrangler.toml` and deploy again. Keep `imagine.api` as `https://imagine.venerablegrain.com`.

## Local

```bash
cd worker
npx wrangler dev
```

Jekyll on `:4000` is already in `ALLOWED_ORIGINS`. Temporarily set `imagine.api` to `http://127.0.0.1:8787` while testing.
