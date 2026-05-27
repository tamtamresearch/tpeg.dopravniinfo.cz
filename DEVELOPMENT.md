# Development Guide

Complete guide for developing and contributing to the NDIC National Registry project.

---

## Running the Site

### Development Mode

Start the VitePress development server with hot module replacement:

```bash
npm run docs:dev
```

**What happens:**

- Opens at `http://localhost:5173`
- **Automatically watches** `docs/data/conf_files/` for changes
- **Auto-compiles** YAML fragments to `compiled.yaml` when files change
- HMR updates pages instantly (no validation)
- Fast iteration for content changes

**Note:** The dev server compiles but **does not validate** configuration. For validation, use the `ndic-build` CLI tool.

**When configuration changes:**

1. You edit a file in `docs/data/conf_files/`
2. VitePress detects the change
3. Configuration is compiled to `compiled.yaml`
4. Pages are regenerated via templates
5. Browser updates automatically via HMR

### Production Build

Build the complete static site:

```bash
npm run docs:build
```

Output directory: `docs/.vitepress/dist/`

### Preview Production Build

Preview the production build locally:

```bash
npm run docs:preview
```

This serves the built site from `docs/.vitepress/dist/`

---

## Configuration Management

The project includes a dedicated CLI tool (`ndic-build`) for managing YAML configuration files. **This tool is primarily useful for larger configuration changes and when validation is required.**

### When to use ndic-build CLI:

- **Large configuration changes** - Refactoring multiple files
- **Validation required** - Ensuring schema compliance and cross-references
- **CI/CD pipelines** - Automated validation before deployment
- **Troubleshooting** - Diagnosing configuration issues

### When NOT needed:

- **Daily content editing** - VitePress dev mode handles this automatically
- **Small updates** - Single file edits are handled by dev server
- **Quick iterations** - Dev mode is faster for testing changes

### Compiling Configuration

Compile YAML fragments into the main configuration file with validation:

```bash
node docs/scripts/ndic-build.js build
```

**Options:**

- `--force` - Force rebuild even if files are up-to-date

**This is useful when:**

- Making large structural changes
- Need to validate configuration
- Preparing for production deployment
- Running in CI/CD pipeline

Example output:

```
📄 Step 1: Compiling configuration...
✅ docs/data/compiled.yaml is up-to-date, skipping compilation

📄 Step 2: Validating configuration...
✅ Configuration validation passed
📊 Configuration statistics:
   providers: 2
   sources: 25
   formats: 27
   protocols: 7
```

### Validating Configuration

Validate configuration against schema:

```bash
node docs/scripts/ndic-build.js validate
```

### Watching for Changes

Watch for configuration changes and auto-rebuild with validation:

```bash
node docs/scripts/ndic-build.js watch
```

Useful for development when editing configuration files and needing validation feedback.

### Configuration Statistics

View configuration file information:

```bash
node docs/scripts/ndic-build.js info
```

**For detailed CLI documentation, see [CLI_REFERENCE.md](CLI_REFERENCE.md)**

### Development Workflow Comparison

**For daily content editing (recommended):**

```bash
npm run docs:dev
# Edit files in docs/data/conf_files/
# Changes compile and display automatically
# Fast, no validation
```

**For major changes or validation:**

```bash
# Terminal 1: Watch and validate changes
node docs/scripts/ndic-build.js watch

# Terminal 2: Dev server
npm run docs:dev

# Edit files in docs/data/conf_files/
# Both compilation and validation happen
```

---

## Available Scripts

### npm/pnpm Commands

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run docs:dev`     | Start development server with hot-reload |
| `npm run docs:build`   | Build production site                    |
| `npm run docs:preview` | Preview production build                 |
| `npm run lint`         | Run ESLint on `docs/` directory          |
| `npm run lint:fix`     | Auto-fix ESLint issues                   |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |

### ndic-build Commands

| Command    | Description                                        |
| ---------- | -------------------------------------------------- |
| `build`    | Compile and validate configuration (default)       |
| `compile`  | Compile YAML fragments to `compiled.yaml`          |
| `validate` | Validate configuration against schema              |
| `watch`    | Watch for changes and auto-rebuild with validation |
| `info`     | Show configuration statistics                      |

Run with `node docs/scripts/ndic-build.js <command>` or see help with `--help`

---

## Code Quality & Git Hooks

The project uses automated code quality tools.

### Pre-commit Hooks

Git hooks automatically run before each commit using `simple-git-hooks` and `lint-staged`:

- **JavaScript/TypeScript/Vue/JSON** files:
    - ESLint auto-fix
    - Prettier formatting

- **Markdown/YAML** files:
    - Prettier formatting

### Manual Linting

Run linting manually:

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Check code formatting
npm run format:check

# Format all files
npm run format
```

### Configuration Files

- **ESLint:** `eslint.config.js`
- **Prettier:** `prettier.config.js`, `.prettierignore`
- **Git Hooks:** Configured in `package.json` under `simple-git-hooks` and `lint-staged`

---

## Content Authoring

### Primary Content Locations

#### 1. Registry Data (YAML Configuration)

**Location:** `docs/data/conf_files/` - **PRIMARY SOURCE OF TRUTH**

Edit YAML files to add, remove, or modify:

- **Providers** - `providers/*.yaml` - Data provider organizations
- **Sources** - `sources/*.yaml` - Individual data sources
- **Formats** - `formats/*.yaml` - Data format specifications
- **Protocols** - `protocols/*.yaml` - Communication protocols
- **Organizations** - `organizations.yaml` - Organization details
- **Persons** - `persons.yaml` - Contact persons
- **Terms & Conditions** - `terms_and_conditions.yaml`

**Development workflow:**

1. Start dev server: `npm run docs:dev`
2. Edit YAML files in `docs/data/conf_files/`
3. Changes automatically compile and display in browser
4. (Optional) Run validation before committing: `node docs/scripts/ndic-build.js validate`

**For major changes requiring validation:**

1. Terminal 1 - Run watch with validation: `node docs/scripts/ndic-build.js watch`
2. Terminal 2 - Run dev server: `npm run docs:dev`
3. Edit YAML files - both compilation and validation happen

#### 2. Static Documentation

**Location:** `docs/public/docs/`

Add pre-generated documentation files:

- **Format specifications** - PDFs, technical documentation
- **Protocol documentation** - Implementation guides
- **Provider documents** - Certificates, terms of service
- **Images and diagrams** - Graphics, architecture diagrams

These files are automatically available at `/docs/...` URL path.

### Configuration Structure

Each configuration type follows a consistent structure with multilingual support:

```yaml
entity_key:
    name:
        cs: "Czech Name"
        en: "English Name"
    description:
        cs: "Czech description"
        en: "English description"
    # ... additional properties
```

**See:** `docs/data/conf_files/README.md` for detailed schema documentation.

---

## Template Customization

### Template Structure

Templates are located in `docs/templates/{cs,en}/` and organized by content type:

```
templates/
├── cs/
│   ├── about/        # Static pages
│   ├── formats/      # Format pages
│   │   ├── index.njk # List page
│   │   └── one.njk   # Detail page
│   ├── protocols/
│   ├── providers/
│   └── sources/
└── en/
    └── (same structure)
```

### Template Files

- **`index.njk`** - Generates list/index pages showing all items in a category
- **`one.njk`** - Generates individual detail pages for each entity

### Template Variables

Templates have access to:

- `data` - The entire compiled configuration object
- `locale` - Current language ('cs' or 'en')
- `item` - Current entity being rendered (in `one.njk`)
- Helper functions from `docs/lib/pathGenerators.js`

### Example: Modifying a Template

To change how source detail pages are rendered:

1. Edit `docs/templates/en/sources/one.njk` (and/or `docs/templates/cs/sources/one.njk`)
2. Modify the Nunjucks template
3. Restart the dev server to see changes

---

## Navigation & Theming

### VitePress Configuration

Main configuration: `docs/.vitepress/config.js`

**Key sections:**

```javascript
export default defineConfig({
    locales: {
        root: {
            /* English config */
        },
        cs: {
            /* Czech config */
        },
    },
    themeConfig: {
        nav: [
            /* Navigation items */
        ],
        sidebar: {
            /* Sidebar configuration */
        },
    },
});
```

### Sidebar Configuration

Sidebars are automatically generated from YAML configuration using the `generateSidebarFromYaml()` function:

```javascript
sidebar: {
  '/sources/': [{
    text: 'Sources',
    items: generateSidebarFromYaml('en', 'sources')
  }]
}
```

This dynamically creates sidebar items from the `sources` section of `compiled.yaml`.

### Adding New Static Pages

To add explanatory pages (FAQ, About, etc.):

1. Create markdown file in `docs/en/about/newpage.md` (and `docs/cs/about/newpage.md`)
2. Add to navigation in `docs/.vitepress/config.js`:

```javascript
nav: [{ text: "About", link: "/about/newpage" }];
```

3. (Optional) Add to sidebar for that section

### Theme Customization

Custom theme components: `docs/.vitepress/theme/`

---

## Quality & Validation

### Configuration Validation

#### Schema Validation

All configuration is validated against a Zod schema defined in `docs/scripts/config-schema.js`.

**Automatic validation:** Happens during `ndic-build build` command.

**Manual validation:**

```bash
node docs/scripts/ndic-build.js validate
```

#### Cross-Reference Checking

Verify that references between entities are valid:

```bash
node docs/scripts/ndic-build.js validate
```

This checks:

- Provider references in sources
- Format references in sources
- Protocol references in sources
- Person and organization references

### Linting & Formatting

#### ESLint

JavaScript linting with ESLint 9:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

**Configuration:** `eslint.config.js`

#### Prettier

Code formatting for all file types:

```bash
# Check formatting
npm run format:check

# Format all files
npm run format
```

**Configuration:** `prettier.config.js`

**Formats:** JavaScript, TypeScript, Vue, JSON, Markdown, YAML

### Build-time Checks

During production build (`npm run docs:build`):

- VitePress validates internal markdown links
- Dead links can optionally fail the build
- Set `VITEPRESS_IGNORE_DEAD_LINKS=1` to ignore (for testing only)

---

## Deployment

### Building for Production

Build the static site:

```bash
npm run docs:build
```

**Output:** `docs/.vitepress/dist/`

This directory contains the complete static site ready for deployment.

### GitLab CI/CD Pipeline

The project includes automated deployment via GitLab Pages.

**Configuration:** `.gitlab-ci.yml`

**Pipeline:**

1. Install Node.js dependencies
2. Run `npm run docs:build`
3. Move `docs/.vitepress/dist` to `public/`
4. Deploy to GitLab Pages

**Deployment URL:** https://tamtamresearch.gitlab.io/crocodile/ndic-nationalregistry/

**Triggers:**

- Pushes to `master` branch
- Pushes to `feat.cicd` branch (for testing)

### Environment Variables

#### CI/CD Environment

Optional environment variables for CI/CD:

- `VITEPRESS_IGNORE_DEAD_LINKS` - Set to `"1"` to ignore dead links (testing only)

#### Site Configuration

Site URLs are configured in `docs/.vitepress/config.js`:

```javascript
sitemap: {
    hostname: "https://registr.dopravniinfo.cz";
}
```

Update this for production deployment.

### Manual Deployment

To deploy manually:

1. Build the site: `npm run docs:build`
2. Copy `docs/.vitepress/dist/` to your web server
3. Configure server to serve static files
4. (Optional) Set up redirects for clean URLs

**Server requirements:**

- Static file serving (Apache, Nginx, etc.)
- Support for clean URLs (no `.html` extensions)

---

## Tools & Utilities

### ndic-build CLI

Comprehensive CLI tool for configuration management and validation.

**Location:** `docs/scripts/ndic-build.js`

**Purpose:** Primarily for larger configuration changes and validation. For daily content editing, the VitePress dev server handles compilation automatically.

**Use cases:**

- Large-scale configuration refactoring
- Pre-commit validation
- CI/CD pipeline integration
- Configuration troubleshooting
- Cross-reference checking

**Commands:**

- `build` - Compile and validate (default)
- `compile` - Compile YAML fragments without validation
- `validate` - Validate existing `compiled.yaml`
- `watch` - Watch and auto-rebuild with validation
- `info` - Show configuration statistics

**See:** [CLI_REFERENCE.md](CLI_REFERENCE.md) for detailed documentation.

### Helper Scripts

Located in `docs/scripts/`:

| Script               | Purpose                |
| -------------------- | ---------------------- |
| `compile-config.js`  | YAML compilation logic |
| `validate-config.js` | Schema validation      |
| `config-schema.js`   | Zod schema definitions |
| `watch-config.js`    | File watching          |

### Data Loading

`docs/lib/dataLoader.js` - Provides `loadMainData()` function to load and parse `compiled.yaml`.

Used by:

- VitePress config (for sidebar generation)
- Template rendering
- Helper utilities

### Path Generators

`docs/lib/pathGenerators.js` - Helper functions for generating URLs and paths in templates.

---

## Architecture Details

### Configuration-Driven Generation

**Primary source of truth:** The `docs/data/conf_files/` directory contains YAML configuration fragments that define all providers, sources, formats, and protocols. All content originates from these files.

**Compilation paths:**

1. **Development mode (`npm run docs:dev`)**: VitePress automatically watches `conf_files/`, compiles changes to `compiled.yaml`, and triggers HMR (Hot Module Replacement) for instant page updates. _Note: Validation does not run automatically in dev mode._

2. **Manual compilation (`ndic-build` CLI)**: Use for larger configuration changes requiring validation. The CLI tool compiles, validates, and can watch for changes.

**Flow:**

```
docs/data/conf_files/ (Primary Source of Truth)
    │
    ├─→ VitePress dev mode → compile → HMR update (no validation)
    │
    └─→ ndic-build CLI → compile + validate → compiled.yaml
```

### Build Pipeline Overview

The static site is generated through a multi-stage pipeline:

1. **Configuration Compilation**
    - **Source**: `docs/data/conf_files/` (YAML fragments) - **PRIMARY SOURCE OF TRUTH**
    - **Output**: `docs/data/compiled.yaml` (auto-generated, do not edit directly)
    - **Methods**:
        - VitePress dev mode (automatic, no validation)
        - `ndic-build` CLI (manual, with validation)

2. **Validation** (CLI only)
    - Schema validation
    - Cross-reference checking
    - Configuration statistics

3. **Template Rendering**
    - Nunjucks templates in `docs/templates/` generate markdown files
    - Uses data from `compiled.yaml`
    - Generates both Czech and English versions

4. **VitePress Build**
    - Processes markdown into HTML
    - Applies theme and styling
    - Generates static assets

5. **Optimization**
    - Pagefind search indexing
    - Asset optimization and bundling

### Template System

**Nunjucks** templates generate markdown pages from the compiled YAML configuration:

- **`one.njk`** - Detail pages for individual entities (providers, sources, formats, protocols)
- **`index.njk`** - List/index pages for each category
- **Template Variables** - Full access to configuration data, locale information, and helper functions

### Content Generation Flow

**Source of Truth:** `docs/data/conf_files/` (YAML fragments)

The compilation can happen through two different paths:

#### Path 1: Manual/CLI Build (with validation)

Used for bigger configuration changes and (mainly) validation:

```
docs/data/conf_files/     docs/scripts/ndic-build.js     docs/data/compiled.yaml
(YAML fragments)    -->   (compile + validate)      -->   (validated output)
   [SOURCE]                [✅ WITH VALIDATION]            [ready for use]
```

**When to use:** Before commits, for major changes, when validation is needed

#### Path 2: Development Mode (auto-compilation, no validation)

Used during active development with `npm run docs:dev`:

```
docs/data/conf_files/     confYamlCompiler.js plugin    docs/data/compiled.yaml       VitePress HMR
(YAML fragments)    -->   (auto-compile on save)   -->  (unvalidated output)   -->    (live updates)
   [SOURCE]                [⚠️ NO VALIDATION]             [watched by HMR]          [instant feedback]
```

**When to use:** Small changes to the content and development

---

## Project Structure Details

### Key Directories

| Path                         | Purpose                                                       |
| ---------------------------- | ------------------------------------------------------------- |
| `docs/data/conf_files/`      | **PRIMARY SOURCE OF TRUTH** - YAML configuration fragments    |
| `docs/data/compiled.yaml`    | Compiled configuration (auto-generated, do not edit directly) |
| `docs/templates/`            | Nunjucks templates for generating markdown pages              |
| `docs/cs/` and `docs/en/`    | Generated markdown content (auto-generated from templates)    |
| `docs/public/docs/`          | Static documentation files (PDFs, specifications, images)     |
| `docs/.vitepress/config.js`  | VitePress configuration, navigation, and sidebar setup        |
| `docs/scripts/ndic-build.js` | CLI tool for configuration management and validation          |
| `docs/lib/`                  | Utility libraries for data loading and path generation        |
| `docs/.vitepress/theme/`     | Theme customization                                           |

### Configuration Files Structure

```
docs/data/conf_files/
├── formats/          # Format definitions
├── protocols/        # Protocol definitions
├── providers/        # Provider information
├── sources/          # Data source definitions
├── organizations.yaml
├── persons.yaml
└── terms_and_conditions.yaml
```

---

## Migration from MkDocs

This project was migrated from MkDocs (Python + Jinja2 + Doit) to VitePress (Node.js + Nunjucks).

### Key Changes

**Technology stack:**

- **Static generator:** MkDocs → VitePress
- **Templates:** Jinja2 → Nunjucks (similar syntax)
- **Build tool:** Doit (Python) → npm scripts + Node.js
- **Dev experience:** Slow rebuilds → Fast HMR

**Directory changes:**

- `conf_files/` → `docs/data/conf_files/`
- `conf.yaml` → `docs/data/compiled.yaml`
- `static_docs/` → `docs/public/docs/`
- `build/` → `docs/.vitepress/dist/`

**Command changes:**

- `uv run doit auto` → `npm run docs:dev` (now auto-compiles)
- `uv run doit build` → `npm run docs:build`
- `uv run doit compile` → `node docs/scripts/ndic-build.js build` (now optional)

### What Stayed the Same

- Configuration structure and YAML schema
- `conf_files/` as primary source of truth
- Multilingual approach (Czech/English)
- Entity types (providers, sources, formats, protocols)
- Static file handling approach

### For Contributors Familiar with MkDocs

- Configuration files work the same way
- Template syntax is nearly identical (Jinja2 vs Nunjucks)
- Dev server now auto-compiles configuration (validation is optional)
- Much faster development experience with HMR
- Use npm commands instead of `uv run doit`

---

## Additional Resources

### Documentation

- **VitePress Documentation:** https://vitepress.dev/
- **Nunjucks Documentation:** https://mozilla.github.io/nunjucks/
- **Configuration Schema:** `docs/data/conf_files/README.md`
- **CLI Reference:** [CLI_REFERENCE.md](CLI_REFERENCE.md)

### External Plugins

- **VitePress Plugin: Pagefind** - Search functionality
- **VitePress Plugin: LLMstxt** - LLM-friendly documentation
- **VitePress Plugin: Group Icons** - Icon support in navigation
