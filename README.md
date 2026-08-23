# Venerable Grain

Hobby furniture workshop site — solid hardwood, joinery over hardware. Portfolio and process stories first; soft contact for repair, restoration, modernization, and commissions.

**Live (after Pages is enabled):** https://john-cpallc.github.io/venerable-grain/

## Local development

```bash
bundle install
bundle exec jekyll serve --baseurl ""
```

Open http://localhost:4000

For a closer match to production (project Pages path):

```bash
bundle exec jekyll serve
```

Then open http://localhost:4000/venerable-grain/

## Deploy

1. Create a GitHub repo named `venerable-grain` under your account.
2. Push this project to `main`.
3. Repo **Settings → Pages → Build and deployment**: Source = **GitHub Actions**.
4. The workflow in [`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds Jekyll and publishes on every push to `main`.

### Custom domain (later)

Add a `CNAME` file and point DNS at GitHub Pages; set `url` / `baseurl` in `_config.yml` accordingly (`baseurl: ""` when using an apex or www domain).

## Content

| Path | Purpose |
|------|---------|
| `_pieces/` | Collection items (title, category, wood, image, optional story link) |
| `_stories/` | Process narratives |
| `_pages/` | Collection, Materials, Stories, About, Contact |
| `assets/images/` | Replace SVG placeholders with real photos |

Update `email` in `_config.yml` before sharing the contact page widely.
