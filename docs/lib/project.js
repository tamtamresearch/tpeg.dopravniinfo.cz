import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path relative to project root (two levels up from lib/)
export const projectRoot = path.resolve(__dirname, "..");
