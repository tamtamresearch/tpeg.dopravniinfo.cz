import nunjucks from "nunjucks";
import path from "path";
import { projectRoot } from "./project.js";

// Configure Nunjucks with the templates directory
const templatesPath = path.join(projectRoot, "templates");

const env = nunjucks.configure(templatesPath, {
    autoescape: false, // Don't escape HTML since we're generating markdown
    trimBlocks: true,
    lstripBlocks: true,
    noCache: true, // process.env.NODE_ENV === 'development' // Cache in production
});

// Add custom filters
// TODO: check and remove
env.addFilter("slug", function (str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
});

// Add splitlines filter for handling multi-line strings
env.addFilter("splitlines", function (str) {
    if (!str) return [];
    return String(str).split(/\r?\n/);
});

// Add locstr filter for handling localized strings
// Accepts either a string or an object with language keys
env.addFilter("locstr", function (value, lang) {
    if (!value) {
        return "";
    }

    // If it's a plain string, return as-is
    if (typeof value === "string") {
        return value;
    }

    // If it's an object, try to get the language-specific value
    if (typeof value === "object") {
        // Try direct language key (e.g., {en: "...", cs: "..."})
        if (value[lang]) {
            return value[lang];
        }

        // Fallback to English if requested language not found
        if (value.en) {
            return value.en;
        }

        // Return first available value as last resort
        const keys = Object.keys(value);
        if (keys.length > 0) {
            return value[keys[0]];
        }
    }

    return String(value);
});

// Smarter wordwrap filter for Nunjucks
env.addFilter("wordwrap", function (str, width = 80, breakStr = "\n", cut = false) {
    if (typeof str !== "string") str = String(str);
    if (!width || width <= 0) return str;

    // Split into paragraphs (preserve blank lines)
    const paragraphs = str.split(/\r?\n\r?\n/);

    const wrapped = paragraphs.map((paragraph) => {
        const words = paragraph.split(/\s+/);
        let line = "";
        const lines = [];

        for (const word of words) {
            // If adding this word exceeds width, wrap line
            if ((line + word).length > width) {
                if (line.trim()) lines.push(line.trim());
                // If the word itself is longer than width, decide whether to cut it
                if (cut && word.length > width) {
                    const parts = word.match(new RegExp(`.{1,${width}}`, "g"));
                    lines.push(...parts);
                    line = "";
                } else {
                    line = word + " ";
                }
            } else {
                line += word + " ";
            }
        }

        if (line.trim()) lines.push(line.trim());
        return lines.join(breakStr);
    });

    // Rejoin paragraphs with double newlines
    return wrapped.join(`${breakStr}${breakStr}`);
});

/**
 * Render a template with the given context
 * @param {string} templatePath - Path relative to templates/ directory
 * @param {Object} context - Data to pass to the template
 * @returns {string} Rendered content
 */
export function renderTemplate(templatePath, context) {
    return env.render(templatePath, context);
}

/**
 * Get base path for templates
 * @returns {string} Base path for templates
 */
export function getTemplatesBasePath() {
    return templatesPath;
}

// Export the configured environment for advanced use
export { env };
