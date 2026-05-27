# NDIC National Registry

Static site generator for the National Traffic Information Registry of Czech Republic ("Registry") website. Built with VitePress and configuration-driven templates using Nunjucks templating and automated configuration management.

## 📖 Concepts

**NDIC National Registry** is a web-based catalog of traffic data sources, formats, protocols, and providers for the National Traffic Information Registry of Czech Republic. The site serves as:

- A comprehensive directory of traffic data providers
- A technical reference for data formats and protocols
- A bilingual (Czech/English) documentation platform
- A configuration-driven, maintainable documentation system

---

## ✨ Key Features

- **Configuration-Driven Generation** - Content is generated from YAML configuration files, ensuring consistency and maintainability
- **Multilingual Support** - Full Czech (cs) and English (en) versions with shared documentation assets
- **Automated Build Pipeline** - YAML compilation, template rendering, and validation happen automatically
- **Template System** - Nunjucks templates generate markdown pages from structured configuration data
- **Modern Stack** - Built on VitePress for fast, SEO-friendly static site generation
- **Quality Assurance** - Automated configuration validation, schema checking, and linting

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** version 18 or higher
- **npm**, **pnpm**, **yarn**, or **bun** package manager

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development Server

Start the development server with hot-reload:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173`

**Note:** The dev server automatically watches and compiles configuration files from `docs/data/conf_files/` (the primary source of truth).

The server might not catch more significant changes like adding or deleting new files.
In this case it is recommended to restart the server from the console (press key R).

### Building for Production

Build the static site:

```bash
npm run docs:build
```

The built site will be in `docs/.vitepress/dist/`

### Preview Production Build

Preview the production build locally:

```bash
npm run docs:preview
```

---

## 🗂️ Architecture Overview

### Configuration-Driven Generation

**Primary source of truth:** The `docs/data/conf_files/` directory contains YAML configuration fragments that define all providers, sources, formats, and protocols.

**Flow:**

```
docs/data/conf_files/ (YAML fragments)
    ↓
VitePress dev mode / ndic-build CLI
    ↓
docs/data/compiled.yaml (auto-generated)
    ↓
Nunjucks templates
    ↓
Markdown pages (docs/cs/, docs/en/)
    ↓
VitePress build
    ↓
Static site (docs/.vitepress/dist/)
```

### Multilingual Support

Content is generated in both Czech (cs) and English (en) with:

- Separate content directories for each language
- Shared static assets (PDFs, images, specifications)
- Language-specific navigation and metadata
- Automatic locale-based routing

---

## 📁 Project Structure

```
vitepress-nationalregistry/
├── docs/
│   ├── .vitepress/           # VitePress configuration
│   ├── data/
│   │   ├── conf_files/       # YAML fragments (PRIMARY SOURCE)
│   │   └── compiled.yaml     # Compiled config (auto-generated)
│   ├── templates/            # Nunjucks templates
│   │   ├── cs/               # Czech templates
│   │   └── en/               # English templates
│   ├── scripts/              # Build and utility scripts
│   │   └── ndic-build.js     # CLI tool for config management
│   ├── public/               # Static assets
│   │   └── docs/             # Documentation files (PDFs, specs)
│   ├── cs/                   # Czech content (generated)
│   └── en/                   # English content (generated)
├── .gitlab-ci.yml            # GitLab CI/CD configuration
└── package.json              # Dependencies and scripts
```

---

## 📚 Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development workflows, content authoring, deployment, and architecture details
- **[CLI_REFERENCE.md](CLI_REFERENCE.md)** - Complete ndic-build CLI documentation
- **Configuration Schema** - `docs/data/conf_files/README.md` - Detailed structure of YAML configuration

### External Resources

- **VitePress Documentation:** https://vitepress.dev/
- **Nunjucks Documentation:** https://mozilla.github.io/nunjucks/

---

## 📝 Common Tasks

### Editing Content

1. Edit YAML files in `docs/data/conf_files/`
2. Changes compile automatically in dev mode
3. Preview updates in your browser

### Validating Configuration

```bash
node docs/scripts/ndic-build.js validate
```

### Code Quality

```bash
npm run lint          # Check for issues
npm run format        # Format all files
```

---

**Maintained by:** TamTam Research  
**Contact:** [Contact information]  
**Site:** https://registr.dopravniinfo.cz/
