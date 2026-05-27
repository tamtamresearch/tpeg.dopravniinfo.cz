# Development guide

Workflow notes for editing and shipping the `tpeg.dopravniinfo.cz` site.

---

## Running the site

### Development mode

```bash
npm run docs:dev
```

- Serves at `http://localhost:5173`.
- Watches `docs/` and reloads on change via VitePress HMR.
- For larger structural changes (added/removed files, config edits), press `R` in the terminal to restart.

### Production build

```bash
npm run docs:build
```

Output: `docs/.vitepress/dist/`. VitePress validates internal markdown links at build time. Set `VITEPRESS_IGNORE_DEAD_LINKS=1` to skip - for testing only, never in CI.

### Preview the production build

```bash
npm run docs:preview
```

---

## Available scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run docs:dev`     | Start development server with hot-reload |
| `npm run docs:build`   | Build production site                    |
| `npm run docs:preview` | Preview production build                 |
| `npm run lint`         | Run ESLint over `docs/`                  |
| `npm run lint:fix`     | Auto-fix ESLint issues                   |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing         |

---

## Content authoring

All content is **hand-written Markdown** under `docs/en/`. There is no compilation step from YAML or templates - the site is small enough that direct editing wins.

### Where things live

| Path                        | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `docs/en/index.md`          | Home page (VitePress `home` layout)           |
| `docs/en/about/`            | About, license, contacts, issue tracker       |
| `docs/en/tpeg/`             | What is TPEG, value proposition               |
| `docs/en/pilot/`            | Pilot scope & status, changelog               |
| `docs/en/technical/`        | Protocol page and format pages                |
| `docs/en/subscribe/`        | Subscription instructions and mailto template |
| `docs/en/faq.md`            | FAQ                                           |
| `docs/cs/`                  | Czech placeholder (locale dormant)            |
| `docs/public/`              | Static assets (logo, hero image, PDFs)        |
| `docs/.vitepress/config.js` | Nav, sidebar, plugins, site metadata          |
| `docs/.vitepress/theme/`    | Theme customisation                           |

### Adding a page

1. Create the Markdown file under `docs/en/<section>/`.
2. Add an entry to the relevant sidebar group in `docs/.vitepress/config.js`.
3. If the page deserves a top-nav entry, edit the `nav` array as well.
4. Cross-link from related pages.

### Editing the home page

The hero, action buttons, and feature cards are configured in the front matter of `docs/en/index.md` (VitePress `home` layout). The body markdown below the front matter renders under the hero.

---

## Code quality & git hooks

### Pre-commit

`simple-git-hooks` + `lint-staged` run on staged files:

- **JS / Vue / JSON / mjs**: ESLint auto-fix → Prettier.
- **Markdown / YAML**: Prettier.

### Manual

```bash
npm run lint          # check
npm run lint:fix      # fix
npm run format:check  # check formatting
npm run format        # write formatting
```

Configuration:

- ESLint: `eslint.config.js`
- Prettier: `prettier.config.js`, `.prettierignore`
- Hooks: `simple-git-hooks` and `lint-staged` blocks in `package.json`

---

## Deployment

### Target

The site is deployed as static files to the production domain **`tpeg.dopravniinfo.cz`** (GitHub Pages with a CNAME against the apex hostname).

### Build

```bash
npm run docs:build
```

Then deploy `docs/.vitepress/dist/` to the hosting target. A CI pipeline can do this automatically - adjust the existing pipeline configuration to point at this domain.

### Site URL configuration

If the deployment URL changes, update:

- `sitemap.hostname` in `docs/.vitepress/config.js`
- The `og:url` meta tag in the `head` array of `config.js`

---

## Languages

- **English (root locale)** - published.
- **Czech** - dormant. Locale block is present but commented out in `docs/.vitepress/config.js`. A placeholder lives at `docs/cs/index.md`. Only re-enable if ŘSD explicitly requests Czech content.

---

## Plugins

| Plugin                         | Purpose                              |
| ------------------------------ | ------------------------------------ |
| `vitepress-plugin-pagefind`    | Local search index                   |
| `vitepress-plugin-llmstxt`     | LLM-friendly `llms.txt` for the site |
| `vitepress-plugin-group-icons` | Custom icon support                  |
| `markdown-it-footnote`         | Markdown footnote syntax             |

---

## External resources

- [VitePress documentation](https://vitepress.dev/)
- [TPEG standards](https://tisa.org/) (TISA)
- [ISO 21219](https://www.iso.org/standard/63110.html) - TPEG2
