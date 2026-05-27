// .vitepress/composables/useLanguageCookie.js
import { useData } from "vitepress";
import { watch, onMounted } from "vue";

export function useLanguageCookie() {
    const { lang } = useData();
    const cookieName = "nap-language";

    // Get cookie
    const getCookie = () => {
        const match = document.cookie.match(new RegExp("(^| )" + cookieName + "=([^;]+)"));
        return match ? match[2] : null;
    };

    // Set cookie
    const setCookie = (language) => {
        document.cookie = `${cookieName}=${language}; path=/; max-age=31536000; SameSite=Lax`;
    };

    // Get browser's preferred language
    const getBrowserLanguage = () => {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang;
    };

    // Handle redirection on root page
    const handleRedirection = () => {
        const currentPath = window.location.pathname;
        const savedLang = getCookie();

        // Only redirect from root path
        if (currentPath === "/" || currentPath === "/index.html") {
            if (savedLang) {
                // Use saved preference
                if (savedLang === "cs-CZ") {
                    window.location.href = "/cs/";
                }
            } else {
                // First visit - use browser language
                const browserLang = getBrowserLanguage();
                if (browserLang && browserLang.startsWith("cs")) {
                    window.location.href = "/cs/";
                }
                // Otherwise stay at '/' (English)
            }
        }
    };

    onMounted(() => {
        // Handle redirection first
        handleRedirection();

        // Set cookie for current language
        setCookie(lang.value);

        // Watch for language changes
        watch(lang, (newLang) => {
            setCookie(newLang);
        });
    });

    return {
        getCookie,
        setCookie,
        getBrowserLanguage,
    };
}
