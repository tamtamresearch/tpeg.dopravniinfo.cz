# tpeg.dopravniinfo.cz

Static site for the **Pilot TPEG service in Czechia** - a study and pilot deployment of the TPEG2 standard for traffic and travel information distribution on the Czech road network.

Operated by **CEDA Maps a.s.** in cooperation with **ŘSD** (Czech road and motorway directorate).

- Production site: <https://tpeg.dopravniinfo.cz>
- Issues & discussions: <https://github.com/tamtamresearch/tpeg.dopravniinfo.cz>

---

## What this repository is

This is a [VitePress](https://vitepress.dev/) project that builds the public-relations / documentation site for the pilot. It is intentionally small: the site exists to introduce the service, link to the technical specifications, and walk consumers through the subscription process.

For project background and the original scope see [`BRIEF.md`](BRIEF.md). For development workflows see [`DEVELOPMENT.md`](DEVELOPMENT.md).

---

## Quick start

### Prerequisites

- **Node.js** 20 or higher
- **npm** (or pnpm)

### Install

```bash
npm install
```

### Develop

Start the dev server with hot module replacement:

```bash
npm run docs:dev
```

The site is served at <http://localhost:5173>. The dev server is responsive to single-file edits; if you add or delete files and the page does not update, press `R` in the terminal to restart.

### Build

```bash
npm run docs:build
```

Output goes to `docs/.vitepress/dist/`.

### Preview a production build

```bash
npm run docs:preview
```

---

## Project structure

```
tpeg.dopravniinfo.cz/
├── docs/
│   ├── .vitepress/         # VitePress configuration, theme, composables
│   ├── public/             # Static assets (logos, PDFs, images)
│   ├── en/                 # English content (the published locale)
│   └── cs/                 # Czech content (dormant locale, placeholder only)
├── BRIEF.md                # Project brief / original scope
├── DEVELOPMENT.md
└── package.json
```

Content is hand-written Markdown. There is no YAML-driven generation pipeline - the site is small enough that direct editing is simpler.

---

## Languages

The site is published in **English only**. A Czech locale block is present (commented out) in `docs/.vitepress/config.js` and a placeholder file exists at `docs/cs/index.md`. Activate the Czech locale only if ŘSD explicitly requests Czech content.

---

## Code quality

- **Lint:** `npm run lint` / `npm run lint:fix`
- **Format:** `npm run format` / `npm run format:check`

Pre-commit hooks run ESLint + Prettier on staged files via `simple-git-hooks` and `lint-staged`.

---

**Operator:** CEDA Maps a.s.
**Subscription enquiries:** [tpeg@ceda.cz](mailto:tpeg@ceda.cz)
