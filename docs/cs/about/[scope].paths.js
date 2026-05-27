import { generatePage, getLanguageFromPath, getParentDirName, getWatchPath } from "../../lib/pathGenerators.js";

const lang = getLanguageFromPath(import.meta.url);
const category = getParentDirName(import.meta.url);

export default {
    watch: getWatchPath(category, lang),
    paths() {
        return generatePage("scope", category, lang);
    },
};
