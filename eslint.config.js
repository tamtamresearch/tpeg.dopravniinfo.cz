import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        ignores: ["node_modules/**", "docs/.vitepress/cache/**", "docs/.vitepress/dist/**", "docs/public/**"],
    },

    js.configs.recommended,

    {
        files: ["docs/**/*.js", "docs/**/*.mjs", "../*.js", "../package.json"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },

    prettierConfig,
];
