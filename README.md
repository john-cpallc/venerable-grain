# Venerable Grain

Hobby furniture workshop site — solid hardwood, joinery over hardware. Portfolio and process stories first; soft contact for repair, restoration, modernization, and commissions.

**Live:** https://venerablegrain.com  
**GitHub Pages (until DNS is pointed):** https://john-cpallc.github.io/venerable-grain/

## Local development

```bash
bundle install
bundle exec jekyll serve --baseurl=
```

Open http://localhost:4000

PowerShell treats `""` as a missing argument, so use `--baseurl=` (equals, no quotes) rather than `--baseurl ""`.

## Custom domain

The repo is set for `venerablegrain.com` (`CNAME` file, `url` / `baseurl: ""` in `_config.yml`).

1. At the registrar, point DNS at GitHub Pages:

   | Type | Name | Value |
   |------|------|--------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `john-cpallc.github.io` |

   IPv6 AAAA records are listed in [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

2. Repo **Settings → Pages → Custom domain:** `venerablegrain.com` → **Enforce HTTPS**.

3. Forward `hello@venerablegrain.com` at the registrar if you want the Contact address to land in a real inbox.

## Imagine (describe → generate)

`/imagine/` is a Mad Libs line. The filled sentence is sent to a Cloudflare Worker, optionally rewritten with an LLM, then drawn with FLUX schnell on fal.

The page is live in the static site. **Generate** stays dark until the Worker is deployed and `imagine.api` in `_config.yml` matches that URL.

See [worker/README.md](worker/README.md) for keys, `wrangler deploy`, and attaching `imagine.venerablegrain.com`.

## Deploy

1. Push to `main`.
2. Repo **Settings → Pages → Build and deployment:** Source = **GitHub Actions**.
3. [`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds Jekyll and publishes.

## Content

| Path | Purpose |
|------|---------|
| `_pieces/` | Collection items (title, category, wood, image, optional story link) |
| `_stories/` | Process narratives |
| `_pages/` | Collection, Imagine, Materials, Stories, About, Contact |
| `assets/images/` | Replace SVG placeholders with real photos |
| `worker/` | Sketch API (not part of the Jekyll build) |
