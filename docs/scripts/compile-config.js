import { readFileSync, writeFileSync, existsSync, statSync } from "fs";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { parseDocument, stringify } from "yaml";

/**
 * Recursively get all YAML file paths and their modification times
 */
async function getYamlFilesWithMtime(directoryPath) {
    const files = [];

    try {
        const entries = await readdir(directoryPath);

        for (const entry of entries) {
            const entryPath = join(directoryPath, entry);
            const stats = await stat(entryPath);

            if (stats.isFile() && extname(entry) === ".yaml") {
                files.push({ path: entryPath, mtime: stats.mtime });
            } else if (stats.isDirectory() && !entry.startsWith("_")) {
                const subdirFiles = await getYamlFilesWithMtime(entryPath);
                files.push(...subdirFiles);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}: ${error.message}`);
        throw error;
    }

    return files;
}

/**
 * Check if output file is up-to-date compared to source files
 */
async function isOutputUpToDate(inputDir, outputFile) {
    // If output doesn't exist, it's not up-to-date
    if (!existsSync(outputFile)) {
        return false;
    }

    try {
        const outputStats = statSync(outputFile);
        const outputMtime = outputStats.mtime;

        // Get all YAML source files with their modification times
        const sourceFiles = await getYamlFilesWithMtime(inputDir);

        // Check if any source file is newer than the output
        for (const file of sourceFiles) {
            if (file.mtime > outputMtime) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error(`Error checking file times: ${error.message}`);
        return false;
    }
}

/**
 * Recursively compile YAML files from a directory into a single configuration object
 * Replicates the Python function compile_yaml_directory()
 */
async function compileYamlDirectory(directoryPath) {
    const result = {};

    try {
        const entries = await readdir(directoryPath);

        // Process YAML files first (without sorting to maintain original order)
        for (const entry of entries) {
            const entryPath = join(directoryPath, entry);
            const stats = await stat(entryPath);

            if (stats.isFile() && extname(entry) === ".yaml") {
                const key = basename(entry, ".yaml");

                try {
                    // Parse YAML while preserving comments and structure
                    const fileContent = readFileSync(entryPath, "utf8");
                    const doc = parseDocument(fileContent);
                    const content = doc.toJS();

                    // Check if content has a single key that matches the filename
                    if (content && typeof content === "object" && Object.keys(content).length === 1 && key in content) {
                        // If so, use the content of that key directly
                        result[key] = content[key];
                    } else {
                        // Otherwise, use the entire content
                        result[key] = content;
                    }
                } catch (error) {
                    console.error(`Error processing ${entryPath}: ${error.message}`);
                    throw error;
                }
            }
        }

        // Process subdirectories (exclude directories starting with underscore)
        for (const entry of entries) {
            const entryPath = join(directoryPath, entry);
            const stats = await stat(entryPath);

            if (stats.isDirectory() && !entry.startsWith("_")) {
                const subdirResult = await compileYamlDirectory(entryPath);
                if (Object.keys(subdirResult).length > 0) {
                    result[entry] = subdirResult;
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}: ${error.message}`);
        throw error;
    }

    return result;
}

/**
 * Normalize YAML data by sorting keys at the top two levels
 * Replicates the Python function normalize_yaml()
 */
function normalizeYaml(data) {
    const sortedData = {};

    // Process top level keys in sorted order
    const topLevelKeys = Object.keys(data).sort();
    for (const key of topLevelKeys) {
        const value = data[key];

        // If the value is an object, sort its keys too
        if (value && typeof value === "object" && !Array.isArray(value)) {
            const sortedSubData = {};
            const subKeys = Object.keys(value).sort();
            for (const subkey of subKeys) {
                sortedSubData[subkey] = value[subkey];
            }
            sortedData[key] = sortedSubData;
        } else {
            sortedData[key] = value;
        }
    }

    return sortedData;
}

/**
 * Main compilation function
 * Replicates the Python function compile_conf_action()
 */
async function compileConfig(inputDir = "conf_files", outputFile = "conf.yaml", normalize = true, force = false) {
    try {
        // Check if input directory exists
        if (!existsSync(inputDir)) {
            throw new Error(`Input directory ${inputDir} does not exist`);
        }

        // Check if output is already up-to-date (unless force is true)
        if (!force && (await isOutputUpToDate(inputDir, outputFile))) {
            console.log(`⏭️  ${outputFile} is up-to-date, skipping compilation`);
            return true;
        }

        console.log(`Compiling configuration from ${inputDir}...`);

        // Compile all YAML files
        const compiledData = await compileYamlDirectory(inputDir);

        // Optionally normalize the data
        const finalData = normalize ? normalizeYaml(compiledData) : compiledData;

        // Convert to YAML string with preserved formatting
        const yamlOutput = stringify(finalData, {
            indent: 2,
            lineWidth: 0, // No line wrapping
            minContentWidth: 0,
            quotingType: '"',
            defaultKeyType: null,
            defaultStringType: "PLAIN",
        });

        // Write to output file
        writeFileSync(outputFile, yamlOutput, "utf8");

        console.log(`✅ Successfully compiled ${inputDir} into ${outputFile}`);
        return true;
    } catch (error) {
        console.error(`❌ Compilation failed: ${error.message}`);
        throw error;
    }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const force = args.includes("--force") || args.includes("-f");
    const regularArgs = args.filter((arg) => arg !== "--force" && arg !== "-f");

    const inputDir = regularArgs[0] || "conf_files";
    const outputFile = regularArgs[1] || "conf.yaml";

    try {
        await compileConfig(inputDir, outputFile, true, force);
        process.exit(0);
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        process.exit(1);
    }
}

export { compileConfig, compileYamlDirectory, normalizeYaml };
