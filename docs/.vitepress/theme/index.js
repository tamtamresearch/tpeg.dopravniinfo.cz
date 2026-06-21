import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./styles.css";

const showPrereleaseBanner = String(import.meta.env.VITE_PRERELEASE_BANNER ?? "").trim() !== "";

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            "layout-bottom": () =>
                showPrereleaseBanner
                    ? h("div", { class: "prerelease-banner" }, [
                          h("strong", "Pre-release website. "),
                          "Content is not final and may change before official launch.",
                      ])
                    : null,
        });
    },
};
