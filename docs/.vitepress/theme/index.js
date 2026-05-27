import DefaultTheme from "vitepress/theme";
import { useLanguageCookie } from "../composables/useLanguageCookie";
import "./styles.css";

export default {
    extends: DefaultTheme,
    setup() {
        // Initialize language cookie tracking
        useLanguageCookie();
    },
};
