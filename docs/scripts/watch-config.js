#!/usr/bin/env node

import chokidar from "chokidar";
import { compileConfig } from "./compile-config.js";
import { validateConfig } from "./validate-config.js";

/**
 * Watch configuration files for changes and auto-recompile
 */
function watchConfig(inputDir = "conf_files", outputFile = "conf.yaml") {
    console.log(`👀 Watching ${inputDir} for changes...`);
    console.log(`📄 Output: ${outputFile}`);
    console.log("Press Ctrl+C to stop\n");

    // Initial compilation
    compileAndValidate(inputDir, outputFile);

    // Watch for changes in YAML files, excluding underscore-prefixed directories
    const watcher = chokidar.watch(
        [
            `${inputDir}/**/*.yaml`,
            `!${inputDir}/_*/**/*`, // Exclude _deleted, _staged, _not_used
        ],
        {
            ignored: /(^|[/\\])\../, // ignore dotfiles
            persistent: true,
            ignoreInitial: true,
        }
    );

    let compileTimeout;

    watcher
        .on("add", (path) => {
            console.log(`➕ File added: ${path}`);
            scheduleCompile(inputDir, outputFile);
        })
        .on("change", (path) => {
            console.log(`📝 File changed: ${path}`);
            scheduleCompile(inputDir, outputFile);
        })
        .on("unlink", (path) => {
            console.log(`➖ File removed: ${path}`);
            scheduleCompile(inputDir, outputFile);
        })
        .on("error", (error) => {
            console.error("👎 Watcher error:", error);
        });

    // Debounce compilation to avoid multiple rapid rebuilds
    function scheduleCompile(inputDir, outputFile) {
        clearTimeout(compileTimeout);
        compileTimeout = setTimeout(() => {
            compileAndValidate(inputDir, outputFile);
        }, 300); // Wait 300ms after last change
    }

    // Graceful shutdown
    process.on("SIGINT", () => {
        console.log("\n🛑 Stopping file watcher...");
        watcher.close();
        process.exit(0);
    });
}

async function compileAndValidate(inputDir, outputFile) {
    const startTime = Date.now();

    try {
        // Compile configuration
        await compileConfig(inputDir, outputFile, true);

        // Validate configuration
        const result = validateConfig(outputFile);

        const duration = Date.now() - startTime;

        if (result.success) {
            console.log(`🚀 Rebuild completed successfully in ${duration}ms\n`);
        } else {
            console.log(`⚠️  Rebuild completed with validation errors in ${duration}ms\n`);
        }
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`💥 Rebuild failed in ${duration}ms: ${error.message}\n`);
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const inputDir = process.argv[2] || "conf_files";
    const outputFile = process.argv[3] || "conf.yaml";

    watchConfig(inputDir, outputFile);
}

export { watchConfig };
