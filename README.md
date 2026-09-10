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

## Analytics and indexing

Use a **new** GA4 property and Search Console property for `venerablegrain.com`. Do not reuse the LLC stream; that would mix two businesses.

### 1. Google Analytics 4

1. Open [Google Analytics](https://analytics.google.com/) with the same Google account as the LLC.
2. **Admin → Create → Property**: name it `Venerable Grain`, time zone and currency for the shop.
3. **Platform: Web**. Website URL `https://venerablegrain.com`. Stream name `venerablegrain.com`.
4. Copy the **Measurement ID** (`G-` plus letters and numbers).
5. Paste it in `_config.yml` as `ga4_id`. Push to `main`.

The tag loads only in production (`JEKYLL_ENV=production`), so local `jekyll serve` does not count as traffic. Reports appear under **Reports → Realtime** after the first live page view.

### 2. Search Console (indexing)

`jekyll-sitemap` already publishes [https://venerablegrain.com/sitemap.xml](https://venerablegrain.com/sitemap.xml). `robots.txt` points crawlers at it.

1. Open [Google Search Console](https://search.google.com/search-console) → **Add property** → **URL prefix** → `https://venerablegrain.com`.
2. Choose **HTML tag**. Copy only the `content="…"` value.
3. Paste it in `_config.yml` as `google_site_verification`. Push to `main` and wait for Pages to deploy.
4. Click **Verify**. Then **Sitemaps** → submit `sitemap.xml`.
5. **URL inspection** → inspect `https://venerablegrain.com/` → **Request indexing**. Repeat for `/collection/` and `/contact/` if you want those crawled first.

HTTPS must already work on the custom domain or verification and indexing will fail.

### 3. Optional

- **Bing Webmaster Tools**: add the site and import from Search Console, or paste Bing’s verification meta later.
- **Google Business Profile**: only if this shop should show on Maps; that is separate from Analytics.

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
