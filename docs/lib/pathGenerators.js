import { loadMainData, mainDataPath } from "./dataLoader.js";
import { renderTemplate, getTemplatesBasePath } from "./nunjucks.js";
import { fileURLToPath } from "url";

import path from "path";

/**
 * Extract language from the file path
 * @param {string} filePath - Full file path
 * @returns {string} Language code ('en' or 'cs')
 */
export function getLanguageFromPath(filePath) {
    return filePath.includes("/cs/") ? "cs" : "en";
}

/**
 * Extract parent directory name from the file path
 * @param {string} filePath - Full file path (can be import.meta.url)
 * @returns {string} Parent directory name
 */
export function getParentDirName(filePath) {
    const dirname = path.dirname(fileURLToPath(filePath));
    return path.basename(dirname);
}

/**
 * Convert format template strings to callable functions
 */
function makeFormatCallable(formatStr) {
    return {
        format(params) {
            let result = formatStr;
            for (const [key, value] of Object.entries(params)) {
                result = result.replace(new RegExp(`{${key}}`, "g"), value);
            }
            return result;
        },
    };
}

/**
 * Prepare pubformats by converting format strings to callable objects
 */
function preparePubformats(pubformats) {
    const prepared = {};
    for (const [key, formatStr] of Object.entries(pubformats || {})) {
        prepared[key] = makeFormatCallable(formatStr);
    }
    return prepared;
}

/**
 * Create an error page with debug information
 */
function createErrorPage(itemId, error, lang, data, itemData, key) {
    return `---
title: Template Error - ${itemId}
---

# 🚨 Template Rendering Error

**Item ID:** \`${itemId}\`
**Collection Key:** \`${key}\`

**Error Message:**
\`\`\`
${error.message}
\`\`\`

**Stack Trace:**
\`\`\`
${error.stack}
\`\`\`

**Template Path:** \`templates/${lang}/${key}/one.njk\`

---

## Debug Information

**Available Context Keys:**
- lang: \`${lang}\`
- key: \`${itemId}\`
${Object.keys(data)
    .map((k) => `- ${k}: ${Object.keys(data[k] || {}).length} items`)
    .join("\n")}

**Item Data:**
\`\`\`json
${JSON.stringify(itemData, null, 2)}
\`\`\`
`;
}

/**
 * Generate detail pages for a given collection key (e.g., "providers")
 */
export function generatePathsForKey(key, lang) {
    const data = loadMainData();

    if (lang === undefined) {
        throw new Error("Missing mandatory parameter: lang");
    }

    return Object.entries(data[key] || {}).map(([itemId, itemData]) => {
        try {
            const content = renderTemplate(`${lang}/${key}/one.njk`, {
                lang,
                key: itemId,
                providers: data.providers || {},
                organizations: data.organizations || {},
                sources: data.sources || {},
                protocols: data.protocols || {},
                formats: data.formats || {},
                conformance: data.conformance || {},
                pubformats: preparePubformats(data.pubformats),
                terms_and_conditions: data.terms_and_conditions || {},
                access_points: data.access_points || {},
                persons: data.persons || {},
            });

            return {
                params: { id: itemId },
                content,
            };
        } catch (error) {
            console.error(`Template error for ${itemId}:`, error);

            return {
                params: { id: itemId },
                content: createErrorPage(itemId, error, lang, data, itemData, key),
            };
        }
    });
}

/**
 * Generate an index page for a given collection key (e.g., "providers")
 */
export function generateIndexPathForKey(key, lang) {
    const data = loadMainData();

    if (lang === undefined) {
        throw new Error("Missing mandatory parameter: lang");
    }

    const content = renderTemplate(`${lang}/${key}/index.njk`, {
        lang,
        [key]: data[key] || {},
        providers: data.providers || {},
        organizations: data.organizations || {},
        sources: data.sources || {},
        protocols: data.protocols || {},
        formats: data.formats || {},
        conformance: data.conformance || {},
        pubformats: preparePubformats(data.pubformats),
        terms_and_conditions: data.terms_and_conditions || {},
        access_points: data.access_points || {},
        persons: data.persons || {},
    });

    return [
        {
            params: { index: "index" },
            content,
        },
    ];
}

/**
 * Generate a page by key and page name
 */
export function generatePage(pageName, key, lang) {
    const data = loadMainData();

    if (lang === undefined) {
        throw new Error("Missing mandatory parameter: lang");
    }

    const content = renderTemplate(`${lang}/${key}/${pageName}.njk`, {
        lang,
        [key]: data[key] || {},
        data: data,
        providers: data.providers || {},
        organizations: data.organizations || {},
        sources: data.sources || {},
        protocols: data.protocols || {},
        formats: data.formats || {},
        conformance: data.conformance || {},
        pubformats: preparePubformats(data.pubformats),
        terms_and_conditions: data.terms_and_conditions || {},
        access_points: data.access_points || {},
        persons: data.persons || {},
    });

    return [
        {
            params: { [pageName]: pageName },
            content,
        },
    ];
}

/**
 * Return watch path for templates
 */
export function getWatchPath(key, lang) {
    return [`${getTemplatesBasePath()}/${lang}/${key}/*.njk`, mainDataPath()];
}
