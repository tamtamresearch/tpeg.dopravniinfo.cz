#!/usr/bin/env node

import { Command } from "commander";
import { compileConfig } from "./compile-config.js";
import { validateConfig, validateCrossReferences } from "./validate-config.js";
import { watchConfig } from "./watch-config.js";
import { readFileSync } from "fs";
import { parse } from "yaml";

// Default paths
const DEFAULT_INPUT_DIR = "docs/data/conf_files";
const DEFAULT_OUTPUT_FILE = "docs/data/compiled.yaml";

const program = new Command();

// Read package.json for version
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

program.name("ndic-build").description("NDIC National Registry configuration build tool").version(packageJson.version);

// Compile command
program
    .command("compile")
    .description("compile YAML configuration files into single conf.yaml")
    .option("-i, --input <dir>", "input directory", DEFAULT_INPUT_DIR)
    .option("-o, --output <file>", "output file", DEFAULT_OUTPUT_FILE)
    .option("--no-normalize", "skip key normalization/sorting")
    .option("-f, --force", "force overwrite of output file", false)
    .action(async (options) => {
        try {
            await compileConfig(options.input, options.output, options.normalize, options.force);
            process.exit(0);
        } catch (error) {
            console.error(`Compilation failed: ${error.message}`);
            process.exit(1);
        }
    });

// Validate command
program
    .command("validate")
    .description("validate configuration file against schema")
    .option("-c, --config <file>", "configuration file to validate", DEFAULT_OUTPUT_FILE)
    .option("--cross-refs", "check cross-references between entities", true)
    .option("--stats", "show detailed statistics", false)
    .action((options) => {
        try {
            const result = validateConfig(options.config);

            if (!result.success) {
                process.exit(1);
            }

            if (options.crossRefs) {
                console.log("\n🔗 Checking cross-references...");
                const crossRefResult = validateCrossReferences(result.data);

                if (crossRefResult.errors.length > 0) {
                    console.error("Cross-reference errors:");
                    crossRefResult.errors.forEach((error, i) => {
                        console.error(`  ${i + 1}. ${error}`);
                    });
                    process.exit(1);
                }

                if (crossRefResult.warnings.length > 0) {
                    console.warn("Cross-reference warnings:");
                    crossRefResult.warnings.forEach((warning, i) => {
                        console.warn(`  ${i + 1}. ${warning}`);
                    });
                }

                console.log("✅ Cross-reference validation passed");
            }

            if (options.stats) {
                console.log("\n📈 Detailed statistics:");
                console.log(`Configuration last modified: ${new Date().toISOString()}`);
            }

            console.log("\n🎉 Validation completed successfully!");
            process.exit(0);
        } catch (error) {
            console.error(`Validation failed: ${error.message}`);
            process.exit(1);
        }
    });

// Build command (compile + validate)
program
    .command("build")
    .description("compile and validate configuration (default command)")
    .option("-i, --input <dir>", "input directory", DEFAULT_INPUT_DIR)
    .option("-o, --output <file>", "output file", DEFAULT_OUTPUT_FILE)
    .option("--no-normalize", "skip key normalization/sorting")
    .option("-f, --force", "force overwrite of output file", false)
    .option("--cross-refs", "check cross-references between entities", false)
    .action(async (options) => {
        try {
            // Compile
            console.log("📄 Step 1: Compiling configuration...");
            await compileConfig(options.input, options.output, options.normalize, options.force);

            // Validate
            console.log("\n📄 Step 2: Validating configuration...");
            const result = validateConfig(options.output);

            if (!result.success) {
                process.exit(1);
            }

            // Cross-reference validation
            if (options.crossRefs) {
                console.log("\n📄 Step 3: Checking cross-references...");
                const crossRefResult = validateCrossReferences(result.data);

                if (crossRefResult.errors.length > 0) {
                    console.error("Cross-reference errors:");
                    crossRefResult.errors.forEach((error, i) => {
                        console.error(`  ${i + 1}. ${error}`);
                    });
                    process.exit(1);
                }

                if (crossRefResult.warnings.length > 0) {
                    console.warn("Cross-reference warnings:");
                    crossRefResult.warnings.forEach((warning, i) => {
                        console.warn(`  ${i + 1}. ${warning}`);
                    });
                }
            }

            console.log("\n🎉 Build completed successfully!");
            process.exit(0);
        } catch (error) {
            console.error(`Build failed: ${error.message}`);
            process.exit(1);
        }
    });

// Watch command
program
    .command("watch")
    .description("watch for changes and auto-rebuild configuration")
    .option("-i, --input <dir>", "input directory to watch", DEFAULT_INPUT_DIR)
    .option("-o, --output <file>", "output file", DEFAULT_OUTPUT_FILE)
    .action((options) => {
        watchConfig(options.input, options.output);
    });

// Info command
program
    .command("info")
    .description("show configuration file information")
    .option("-c, --config <file>", "configuration file", DEFAULT_OUTPUT_FILE)
    .action((options) => {
        try {
            const content = readFileSync(options.config, "utf8");
            const data = parse(content);

            console.log(`📄 Configuration file: ${options.config}`);
            console.log(`📊 File size: ${(content.length / 1024).toFixed(1)} KB`);
            console.log(`📅 Last modified: ${new Date().toISOString()}\n`);

            console.log("📈 Content summary:");
            const sections = {
                Providers: data.providers || {},
                Sources: data.sources || {},
                Formats: data.formats || {},
                Protocols: data.protocols || {},
                Organizations: data.organizations || {},
                Persons: data.persons || {},
                "Access Points": data.access_points || {},
                Conformance: data.conformance || {},
                "Terms & Conditions": data.terms_and_conditions || {},
            };

            for (const [name, section] of Object.entries(sections)) {
                const count = typeof section === "object" ? Object.keys(section).length : 0;
                console.log(`  ${name}: ${count}`);
            }
        } catch (error) {
            console.error(`Failed to read configuration: ${error.message}`);
            process.exit(1);
        }
    });

program.parse();

export { program };
