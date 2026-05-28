# CLAUDE.md

Orientation for Claude Code working in this repo.

## What this is

Static [VitePress](https://vitepress.dev/) site for the **Pilot TPEG service in Czechia** — a study and pilot deployment of the TPEG2 standard for traffic and travel information, operated by **CEDA Maps a.s.** for **ŘSD**. Site is small, public-relations / documentation in nature, English-only, hosted on `tpeg.dopravniinfo.cz`.

Project brief: [`BRIEF.md`](BRIEF.md). User docs: [`README.md`](README.md), [`DEVELOPMENT.md`](DEVELOPMENT.md).

## Commands

| Command                           | What it does                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `npm run docs:dev`                | Dev server with HMR on `http://localhost:5173`. Press `R` in terminal if added/removed files don't appear. |
| `npm run docs:build`              | Production build to `docs/.vitepress/dist/`. Validates internal links.                                     |
| `npm run docs:preview`            | Preview the production build locally.                                                                      |
| `npm run lint` / `lint:fix`       | ESLint over `docs/`.                                                                                       |
| `npm run format` / `format:check` | Prettier across the repo.                                                                                  |

There is **no** YAML/Nunjucks generation pipeline. Content is hand-written Markdown.

## Layout

```
docs/
├── .vitepress/config.js   # nav, sidebars, plugins, site metadata
├── .vitepress/theme/      # theme overrides
├── public/                # static assets (logo, pdfs/)
├── en/                    # published English content (root locale)
│   ├── index.md           # home (VitePress `home` layout)
│   ├── about/             # overview (hub) + license, contacts, issues
│   ├── tpeg/              # single page: what is TPEG
│   ├── pilot/             # single page: scope & status
│   ├── technical/         # overview + protocol + formats/{tpeg2-tec, tpeg2-tfp}
│   ├── subscribe/         # subscription instructions (mailto: prefill)
│   └── faq.md
└── cs/index.md            # "locale dormant" placeholder only
```

Top nav (6 items): **About · TPEG · Pilot · Technical · Subscribe · FAQ**. Sidebars are hand-rolled in `docs/.vitepress/config.js` — no dynamic generation. Sidebars are defined **only for sections with multiple pages** (`/about/`, `/technical/`); single-page sections (`/tpeg/`, `/pilot/`, `/subscribe/`, `/faq`) render full-width with no sidebar. Don't add a one-item sidebar to a section just to fill space.

## Conventions

- **English only.** A Czech locale block exists in `config.js` but is commented out. Activate **only** if ŘSD explicitly requests Czech content.
- **Pre-commit hook reformats markdown.** `simple-git-hooks` + `lint-staged` run Prettier + ESLint on staged files. Expect markdown tables to be aligned and `*emphasis*` to be normalized to `_emphasis_` after commit. Don't fight it.
- **Internal links** are absolute (e.g. `/technical/formats/tpeg2-tec`) — VitePress validates them at build time. Set `VITEPRESS_IGNORE_DEAD_LINKS=1` only for testing, never in CI.
- **PDFs** live in `docs/public/pdfs/` and are referenced as `/pdfs/<file>`. The extension is excluded from VitePress routing via `VITE_EXTRA_EXTENSIONS`.
- **Hero image** is `docs/public/images/logo.png`
- **FSP identifier convention**: `x-format:cz-ndic_tpeg2-<app>-v<version>` — note the **underscore** between `ndic` and `tpeg2`, and **hyphens** elsewhere. Same convention for the repo name (`x-format_cz-ndic_tpeg2-<app>-v<version>`). Don't introduce a hyphen between `ndic` and `tpeg2` — a typo of that exact kind already had to be cleaned up across docs once.

## Gotchas

- **CRLF warnings on `git add`** are normal on Windows — Git is converting LF→CRLF in the working copy. Files are stored LF in the repo.
- **`name` field** in `package.json` is still `vitepress-nationalregistry`, left over from the registry-era project. Cosmetic; not load-bearing.
- **Rollup warnings about `@vueuse/core` `/* #__PURE__ */` comments** during build are upstream noise — ignore.
- `docs/cs/index.md` exists only so the dead `/cs/` route doesn't 404 with confusing content. Don't expand it without enabling the cs locale.

## When editing content

1. Edit the markdown under `docs/en/<section>/`.
2. If you add a page, add it to the matching sidebar group in `docs/.vitepress/config.js` — but only if that section already has a sidebar (`/about/`, `/technical/`). If a single-page section grows to two pages, that's when you _create_ a sidebar for it. Top-nav additions also go in `nav`.
3. Cross-link from related pages — the site is small and inter-linking is the main navigation aid alongside the sidebar.
4. Run `npm run docs:build` before declaring done — the link checker catches typos in absolute paths.

## When editing config

`docs/.vitepress/config.js` carries site metadata that's easy to miss when changing domains or branding:

- `sitemap.hostname`
- `head` array → `og:url`, `og:site_name`, `theme-color`
- `themeConfig.socialLinks` → GitHub URL
- `locales.root.themeConfig.footer` → operator copyright
