import fs from "fs";
import path from "path";
import yaml, { FAILSAFE_SCHEMA } from "js-yaml";
import { projectRoot } from "./project.js";

const mainDataPathRel = "data/compiled.yaml";

// In-memory cache with mtime tracking
// Structure: { relativePath: { data: Object, mtime: number } }
const cache = {};

/**
 * Load and parse a YAML file with mtime-based caching
 * @param {string} relativePath - Path relative to project root (e.g., 'data/nationalregistry/conf.yaml')
 * @returns {Object} Parsed YAML data
 */
export function loadData(relativePath) {
    // Resolve path relative to project root
    const fullPath = path.join(projectRoot, relativePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Data file not found: ${fullPath}`);
    }

    // Get current file modification time
    const stats = fs.statSync(fullPath);
    const currentMtime = stats.mtime.getTime();

    // Check cache and validate that file hasn't changed
    if (cache[relativePath] && cache[relativePath].mtime === currentMtime) {
        return cache[relativePath].data;
    }

    // File changed or not cached - read and parse YAML
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const data = yaml.load(fileContent, { schema: FAILSAFE_SCHEMA });

    // Cache the result with mtime
    cache[relativePath] = {
        data: data,
        mtime: currentMtime,
    };

    return data;
}

/**
 * Return main data path
 * @returns {string} Main data path
 */
export function mainDataPath() {
    return path.join(projectRoot, mainDataPathRel);
}

/**
 * Load and parse main data YAML
 * @returns {Object} Parsed YAML data
 */
export function loadMainData() {
    return loadData(mainDataPathRel);
}

/**
 * Clear the cache (useful for development/testing)
 */
export function clearCache() {
    Object.keys(cache).forEach((key) => delete cache[key]);
}
