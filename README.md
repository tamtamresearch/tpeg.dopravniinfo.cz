# Web - tpeg.dopravniinfo.cz

Static site generator for the TPEG website. Built with VitePress.

## Concepts

**TPEG website** The site serves as:

- introduction for a data subscriber to new TPEG data source provided by RSD.
- format and protocol information provider

---

## Quick Start

### Prerequisites

- **Node.js** version 20 or higher
- **npm** package manager

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

## Architecture Overview

### Multilingual Support

Currently only English (en) variant exists.

---

## Project Structure

```
tpeg.dopravniinfo.cz/
├── docs/
│   ├── .vitepress/           # VitePress configuration
│   ├── public/               # Static assets
│   ├── cs/                   # Czech content (empty)
│   └── en/                   # English content
└── package.json              # Dependencies and scripts
```

---

## Documentation

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
