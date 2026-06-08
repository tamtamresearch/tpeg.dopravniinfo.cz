import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./styles.css";

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            "layout-bottom": () =>
                h("div", { class: "prerelease-banner" }, [
                    h("strong", "Pre-release website. "),
                    "Content is not final and may change before official launch.",
                ]),
        });
    },
};
