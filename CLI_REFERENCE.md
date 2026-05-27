# ndic-build CLI Reference

Complete reference for the `ndic-build` command-line tool used for configuration management in the NDIC National Registry project.

---

## Overview

The `ndic-build` CLI tool manages the YAML configuration pipeline for the National Registry site. It handles:

- **Compilation** - Merging YAML fragments into a single configuration file
- **Validation** - Checking configuration against schema
- **Cross-reference checking** - Verifying relationships between entities
- **Watch mode** - Auto-rebuilding on file changes
- **Statistics** - Reporting configuration metrics

**Location:** `docs/scripts/ndic-build.js`

**Execution:**

```bash
node docs/scripts/ndic-build.js <command> [options]
```

---

## Commands

### build

Compile YAML configuration fragments and validate the result. This is the default command and recommended for most use cases.

**Usage:**

```bash
node docs/scripts/ndic-build.js build [options]
```

**Options:**

| Option                | Description                                  | Default                   |
| --------------------- | -------------------------------------------- | ------------------------- |
| `-i, --input <dir>`   | Input directory containing YAML fragments    | `docs/data/conf_files`    |
| `-o, --output <file>` | Output file for compiled configuration       | `docs/data/compiled.yaml` |
| `--no-normalize`      | Skip key normalization and sorting           | (normalization enabled)   |
| `-f, --force`         | Force overwrite even if output is up-to-date | `false`                   |
| `--cross-refs`        | Check cross-references between entities      | `true`                    |

**What it does:**

1. **Step 1: Compilation**
    - Reads all YAML files from input directory
    - Merges them into a single configuration object
    - Normalizes and sorts keys (unless `--no-normalize`)
    - Writes to output file (unless up-to-date and not `--force`)

2. **Step 2: Validation**
    - Validates compiled configuration against Zod schema
    - Reports any schema violations
    - Shows configuration statistics

3. **Step 3: Cross-reference checking**
    - Verifies provider references exist
    - Checks format and protocol references
    - Validates person and organization links

**Examples:**

```bash
# Standard build (uses defaults)
node docs/scripts/ndic-build.js build

# Force rebuild even if up-to-date
node docs/scripts/ndic-build.js build --force

# Build with cross-reference checking
node docs/scripts/ndic-build.js build

# Build with custom paths
node docs/scripts/ndic-build.js build -i custom/conf -o custom/output.yaml

# Build without key normalization
node docs/scripts/ndic-build.js build --no-normalize
```

**Output Example:**

```
📄 Step 1: Compiling configuration...
✅ docs/data/compiled.yaml is up-to-date, skipping compilation

📄 Step 2: Validating configuration...
Validating configuration: docs/data/compiled.yaml
✅ Configuration validation passed
📊 Configuration statistics:
   providers: 2
   sources: 25
   formats: 27
   protocols: 7
   organizations: 2
   persons: 4

🎉 Build completed successfully!
```

**Exit Codes:**

- `0` - Success
- `1` - Compilation, validation, or cross-reference errors

---

### compile

Compile YAML fragments into a single configuration file without validation.

**Usage:**

```bash
node docs/scripts/ndic-build.js compile [options]
```

**Options:**

| Option                | Description                                  | Default                   |
| --------------------- | -------------------------------------------- | ------------------------- |
| `-i, --input <dir>`   | Input directory containing YAML fragments    | `docs/data/conf_files`    |
| `-o, --output <file>` | Output file for compiled configuration       | `docs/data/compiled.yaml` |
| `--no-normalize`      | Skip key normalization and sorting           | (normalization enabled)   |
| `-f, --force`         | Force overwrite even if output is up-to-date | `false`                   |

**What it does:**

1. Scans input directory for `.yaml` and `.yml` files
2. Loads and parses each YAML file
3. Merges them into a single object structure
4. Normalizes keys (alphabetically sorts object keys) unless `--no-normalize`
5. Checks if output file needs updating (timestamp comparison)
6. Writes compiled configuration to output file

**Examples:**

```bash
# Compile with defaults
node docs/scripts/ndic-build.js compile

# Force recompilation
node docs/scripts/ndic-build.js compile --force

# Compile without normalization
node docs/scripts/ndic-build.js compile --no-normalize

# Custom input/output
node docs/scripts/ndic-build.js compile -i src/config -o dist/config.yaml
```

**Output Example:**

```
✅ Compiled 12 files to docs/data/compiled.yaml
📊 Total size: 45.2 KB
```

**When to use:**

- Quick compilation without validation
- Testing compilation process
- When you want to inspect compiled output before validation

**Note:** Usually you should use `build` instead, which includes both compilation and validation.

---

### validate

Validate compiled configuration against the schema without recompiling.

**Usage:**

```bash
node docs/scripts/ndic-build.js validate [options]
```

**Options:**

| Option                | Description                             | Default                   |
| --------------------- | --------------------------------------- | ------------------------- |
| `-c, --config <file>` | Configuration file to validate          | `docs/data/compiled.yaml` |
| `--cross-refs`        | Check cross-references between entities | `true`                    |
| `--stats`             | Show detailed statistics                | `false`                   |

**What it does:**

1. Loads the compiled configuration file
2. Validates structure against Zod schema
3. Reports schema violations (if any)
4. Checks cross-references
5. Optionally shows detailed statistics (if `--stats`)

**Examples:**

```bash
# Validate default compiled config
node docs/scripts/ndic-build.js validate

# Validate with cross-reference checking
node docs/scripts/ndic-build.js validate

# Validate custom file with statistics
node docs/scripts/ndic-build.js validate -c custom.yaml --stats

# Full validation
node docs/scripts/ndic-build.js validate --stats
```

**Output Example (Success):**

```
Validating configuration: docs/data/compiled.yaml
✅ Configuration validation passed
📊 Configuration statistics:
   providers: 2
   sources: 25
   formats: 27
   protocols: 7

🎉 Validation completed successfully!
```

**Output Example (With Errors):**

```
Validating configuration: docs/data/compiled.yaml
❌ Configuration validation failed:

Validation errors:
  1. sources.rsd_traffic.name.cs: Required field missing
  2. providers.rsd.contact_person: Invalid person reference 'john_doe'
  3. formats.datex2.version: Expected string, got number

[Exit code: 1]
```

**Exit Codes:**

- `0` - Validation passed
- `1` - Validation failed

---

### watch

Watch for changes in configuration files and automatically rebuild.

**Usage:**

```bash
node docs/scripts/ndic-build.js watch [options]
```

**Options:**

| Option                | Description                            | Default                   |
| --------------------- | -------------------------------------- | ------------------------- |
| `-i, --input <dir>`   | Input directory to watch               | `docs/data/conf_files`    |
| `-o, --output <file>` | Output file for compiled configuration | `docs/data/compiled.yaml` |

**What it does:**

1. Starts watching the input directory recursively
2. Detects changes to `.yaml` and `.yml` files
3. Automatically recompiles configuration on changes
4. Continues running until manually stopped (Ctrl+C)

**Examples:**

```bash
# Watch default directory
node docs/scripts/ndic-build.js watch

# Watch custom directory
node docs/scripts/ndic-build.js watch -i custom/conf -o custom/output.yaml
```

**Output Example:**

```
👀 Watching for changes in docs/data/conf_files...
Press Ctrl+C to stop.

[12:34:56] File changed: sources/rsd_traffic.yaml
🔄 Recompiling...
✅ Compiled successfully
```

**When to use:**

- During active development of configuration files
- When making multiple changes and want immediate feedback
- Testing configuration changes iteratively

**Note:** Run this in a separate terminal while working on configuration files. Stop with `Ctrl+C`.

---

### info

Display information and statistics about the compiled configuration file.

**Usage:**

```bash
node docs/scripts/ndic-build.js info [options]
```

**Options:**

| Option                | Description                   | Default                   |
| --------------------- | ----------------------------- | ------------------------- |
| `-c, --config <file>` | Configuration file to analyze | `docs/data/compiled.yaml` |

**What it does:**

1. Reads the compiled configuration file
2. Calculates file size and metadata
3. Counts entities in each section
4. Displays summary statistics

**Examples:**

```bash
# Show info for default config
node docs/scripts/ndic-build.js info

# Show info for custom config
node docs/scripts/ndic-build.js info -c custom/config.yaml
```

**Output Example:**

```
📄 Configuration file: docs/data/compiled.yaml
📊 File size: 45.2 KB
📅 Last modified: 2025-01-15T10:30:00.000Z

📈 Content summary:
  Providers: 2
  Sources: 25
  Formats: 27
  Protocols: 7
  Organizations: 2
  Persons: 4
  Access Points: 3
  Conformance: 1
  Terms & Conditions: 2
```

**When to use:**

- Quick overview of configuration contents
- Checking file size and modification time
- Verifying entity counts after changes

---

## Common Workflows

### Daily Development

```bash
# 1. Start watch mode in one terminal
node docs/scripts/ndic-build.js watch

# 2. Start VitePress dev server in another terminal
npm run docs:dev

# 3. Edit YAML files in docs/data/conf_files/
#    - Changes auto-compile via watch
#    - VitePress auto-reloads (may need manual refresh)
```

### Pre-commit Validation

```bash
# Full validation before committing
node docs/scripts/ndic-build.js build --force

# If successful, commit
git add .
git commit -m "Update configuration"
```

### Troubleshooting Configuration

```bash
# 1. Check current state
node docs/scripts/ndic-build.js info

# 2. Force rebuild
node docs/scripts/ndic-build.js build --force

# 3. Validate with cross-references
node docs/scripts/ndic-build.js validate --stats

# 4. If errors, check specific YAML files
# Error messages show entity keys that can help locate issues
```

---

## Error Messages

### Compilation Errors

**"Failed to parse YAML file"**

```
Cause: Invalid YAML syntax in configuration file
Solution: Check the file mentioned in error for syntax errors
         Use a YAML validator or linter
```

**"Output file already exists (use --force to overwrite)"**

```
Cause: Output file is newer than input files
Solution: Use --force flag to rebuild anyway
         Or edit a source file to trigger rebuild
```

**"Input directory not found"**

```
Cause: Specified input directory doesn't exist
Solution: Check path spelling and existence
         Use absolute path or correct relative path
```

### Validation Errors

**"Required field missing"**

```
Cause: Required property not present in configuration
Solution: Add the missing field to the YAML file
         Check schema for required fields
```

**"Invalid type"**

```
Cause: Field has wrong data type (e.g., number instead of string)
Solution: Fix the data type in YAML file
         Quote strings if necessary
```

**"Invalid reference"**

```
Cause: Cross-reference points to non-existent entity
Solution: Check entity key spelling
         Ensure referenced entity exists
         Use 'info' command to see available entities
```

### Cross-Reference Errors

**"Provider 'xyz' referenced in source 'abc' not found"**

```
Cause: Source references a provider that doesn't exist
Solution: Either add the provider or fix the reference
         Check provider key spelling
```

**"Invalid person reference"**

```
Cause: Contact person doesn't exist in persons.yaml
Solution: Add person to persons.yaml or fix reference
```

---

## Advanced Usage

### Scripting and Automation

The CLI tool can be integrated into scripts:

```bash
#!/bin/bash
# Build and deploy script

echo "Building configuration..."
if node docs/scripts/ndic-build.js build; then
    echo "✅ Configuration valid"
    echo "Building site..."
    npm run docs:build
    echo "✅ Site built successfully"
else
    echo "❌ Configuration errors found"
    exit 1
fi
```

### Custom Configuration Locations

Useful for multi-environment setups:

```bash
# Development config
node docs/scripts/ndic-build.js build \
  -i config/dev \
  -o config/dev.yaml

# Production config
node docs/scripts/ndic-build.js build \
  -i config/prod \
  -o config/prod.yaml
```

### Continuous Integration

In CI/CD pipelines:

```yaml
# .gitlab-ci.yml example
validate-config:
    script:
        - node docs/scripts/ndic-build.js build
    only:
        - merge_requests
```

### Pre-commit Hook Integration

Add to Git pre-commit hooks:

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "Validating configuration..."
node docs/scripts/ndic-build.js build

if [ $? -ne 0 ]; then
    echo "❌ Configuration validation failed"
    echo "Fix errors before committing"
    exit 1
fi
```

### Programmatic Usage

The CLI exports functions that can be imported:

```javascript
import { compileConfig } from "./docs/scripts/compile-config.js";
import { validateConfig } from "./docs/scripts/validate-config.js";

// Custom build pipeline
async function customBuild() {
    await compileConfig("input", "output.yaml", true, false);
    const result = validateConfig("output.yaml");

    if (result.success) {
        console.log("Build successful!");
    }
}
```

---

## Tips and Best Practices

### Development Tips

1. **Use watch mode** - Run `watch` command during active development
2. **Validate early** - Run `build` before pushing changes
3. **Check stats** - Use `info` command to verify entity counts
4. **Force rebuild** - Use `--force` when debugging compilation issues

### Performance Tips

1. **Skip normalization** - Use `--no-normalize` for faster builds during testing
2. **Separate validation** - Use `validate` instead of full `build` when config unchanged
3. **Watch only when needed** - Stop watch mode when not actively editing

### Workflow Integration

1. **Pre-commit validation** - Always run `build` before committing
2. **CI/CD integration** - Include validation in your CI pipeline
3. **Documentation** - Keep configuration schema docs updated
4. **Team communication** - Document schema changes in commit messages

---

## Exit Codes

All commands use standard exit codes:

| Code | Meaning                                                     |
| ---- | ----------------------------------------------------------- |
| `0`  | Success                                                     |
| `1`  | Error (compilation, validation, or cross-reference failure) |

Use these for scripting and CI/CD integration:

```bash
if node docs/scripts/ndic-build.js build; then
    echo "Success!"
else
    echo "Failed with exit code $?"
fi
```

---

## Getting Help

**Command-line help:**

```bash
# General help
node docs/scripts/ndic-build.js --help

# Command-specific help
node docs/scripts/ndic-build.js build --help
node docs/scripts/ndic-build.js validate --help
```

**Documentation:**

- Main README: [README.md](README.md)
- Configuration schema: `docs/data/conf_files/README.md`
- Source code: `docs/scripts/ndic-build.js`

**Support:**

- Check error messages carefully - they usually indicate the exact issue
- Review YAML syntax if compilation fails
- Verify schema requirements if validation fails
- Check cross-references if entities can't be found

---

## Version History

Check current version:

```bash
node docs/scripts/ndic-build.js --version
```

Version number comes from `package.json`.
