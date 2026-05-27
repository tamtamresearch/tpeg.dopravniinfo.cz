import path from "path";
import { projectRoot } from "../lib/project.js";
import { compileConfig } from "../scripts/compile-config.js";
import { normalizePath } from "vite";

const sourceDir = path.join(projectRoot, "./data/conf_files/");
const outputFile = path.join(projectRoot, "./data/compiled.yaml");

// Debounce timeout (milliseconds)
const DEBOUNCE_DELAY = 100;
let compileTimeout = null;

/**
 * Compile YAML configuration files
 */
export async function compileYamlFiles() {
    console.log("[ConfYAML Compiler] Compiling YAML files...");
    await compileConfig(sourceDir, outputFile, true);
}

/**
 * Debounced compilation - prevents multiple rapid compilations
 */
function debouncedCompile() {
    if (compileTimeout) {
        clearTimeout(compileTimeout);
    }

    compileTimeout = setTimeout(() => {
        compileYamlFiles();
        compileTimeout = null;
    }, DEBOUNCE_DELAY);
}

/**
 * Vite plugin for YAML configuration compilation
 */
export function confYamlCompilerPlugin() {
    return {
        name: "conf-yaml-compiler",

        async buildStart() {
            await compileYamlFiles();
        },

        configureServer(server) {
            const watchPath = normalizePath(path.resolve(sourceDir));

            server.watcher.add(watchPath);
            console.log(`[ConfYAML Compiler] Watching: ${watchPath}`);

            server.watcher.on("change", async (file) => {
                const normalizedFile = normalizePath(file);

                if (normalizedFile.startsWith(watchPath)) {
                    debouncedCompile();
                }
            });
        },
    };
}
