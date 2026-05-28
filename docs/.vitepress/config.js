import llmstxtPlugin from "vitepress-plugin-llmstxt";
import { defineConfig, resolveSiteDataByRoute } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "vitepress-plugin-group-icons";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import footnote from "markdown-it-footnote";

const prod = !!process.env.NETLIFY || !!process.env.CI;
const extensionsNotHandledByVitePress = "xlsx,docx,zip,pdf";

process.env.VITE_EXTRA_EXTENSIONS = extensionsNotHandledByVitePress;

export default defineConfig({
    title: "Pilot TPEG service in Czechia",

    base: process.env.VITEPRESS_BASE || "/",

    rewrites: {
        "en/:rest*": ":rest*",
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: !!process.env.VITEPRESS_IGNORE_DEAD_LINKS,

    markdown: {
        config(md) {
            md.use(groupIconMdPlugin);
            md.use(footnote);
        },
    },

    sitemap: {
        hostname: "https://tpeg.dopravniinfo.cz",
    },

    head: [
        ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
        ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
        ["meta", { name: "theme-color", content: "#0096DC" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: "Pilot TPEG service in Czechia" }],
        ["meta", { property: "og:url", content: "https://tpeg.dopravniinfo.cz/" }],
    ],

    themeConfig: {
        siteTitle: "TPEG Pilot · CZ",
        logo: { src: "/logo.png", width: 24, height: 24 },

        socialLinks: [{ icon: "github", link: "https://github.com/tamtamresearch/tpeg.dopravniinfo.cz" }],

        search: {
            provider: "local",
        },
    },

    locales: {
        root: {
            label: "English",
            lang: "en-US",
            title: "Pilot TPEG service in Czechia",
            description: "Study and pilot service of the TPEG standard in Czechia",

            themeConfig: {
                nav: [
                    { text: "TPEG", link: "/tpeg/" },
                    { text: "Pilot", link: "/pilot/" },
                    { text: "Technical", link: "/technical/" },
                    { text: "Subscribe", link: "/subscribe/" },
                    { text: "FAQ", link: "/faq" },
                    { text: "About", link: "/about/" },
                ],

                sidebar: {
                    "/about/": [
                        {
                            text: "About",
                            collapsed: false,
                            items: [
                                { text: "Overview", link: "/about/" },
                                { text: "Terms of use", link: "/about/license" },
                                { text: "Contacts", link: "/about/contacts" },
                                { text: "Issue tracker & discussions", link: "/about/issues" },
                            ],
                        },
                    ],
                    "/technical/": [
                        {
                            text: "Technical",
                            collapsed: false,
                            items: [
                                { text: "Overview", link: "/technical/" },
                                { text: "Protocol", link: "/technical/protocol" },
                                {
                                    text: "Formats",
                                    collapsed: false,
                                    items: [
                                        { text: "Overview", link: "/technical/formats/" },
                                        { text: "TPEG2-TEC", link: "/technical/formats/tpeg2-tec" },
                                        { text: "TPEG2-TFP", link: "/technical/formats/tpeg2-tfp" },
                                    ],
                                },
                            ],
                        },
                    ],
                },

                footer: {
                    message: "Pilot TPEG service in Czechia - study and pilot verification of the TPEG standard",
                    copyright: "by CEDA Maps a.s. (IČ 26429632)",
                },
            },
        },

        // Czech locale is dormant. Enable only if ŘSD explicitly requests Czech content.
        // cs: {
        //     label: "Čeština",
        //     lang: "cs-CZ",
        //     title: "Pilotní služba TPEG v Česku",
        //     description: "Studie a pilotní provoz standardu TPEG v Česku",
        //
        //     themeConfig: {
        //         nav: [
        //             { text: "O projektu", link: "/cs/about/" },
        //             { text: "TPEG", link: "/cs/tpeg/" },
        //             { text: "Pilot", link: "/cs/pilot/" },
        //             { text: "Technika", link: "/cs/technical/" },
        //             { text: "Odběr", link: "/cs/subscribe/" },
        //             { text: "FAQ", link: "/cs/faq" },
        //         ],
        //         sidebar: { /* mirror EN structure with /cs/ prefix */ },
        //         footer: {
        //             message: "Pilotní služba TPEG v Česku",
        //             copyright: "CEDA Maps a.s. (IČ 26429632)",
        //         },
        //     },
        // },
    },

    vite: {
        define: {
            "import.meta.env.VITE_EXTRA_EXTENSIONS": JSON.stringify(extensionsNotHandledByVitePress),
        },
        resolve: {
            preserveSymlinks: true,
        },
        plugins: [
            llmstxtPlugin(),
            groupIconVitePlugin({
                customIcon: {
                    vitepress: localIconLoader(import.meta.url, "../public/logo.png"),
                },
            }),
            pagefindPlugin({
                locales: {
                    root: {
                        btnPlaceholder: "Search",
                        placeholder: "Search...",
                        emptyText: "No results",
                        heading: "Total: {{searchResult}} search results.",
                    },
                },
            }),
        ],
        experimental: {
            enableNativePlugin: true,
        },
    },

    transformPageData: prod
        ? (pageData, ctx) => {
              const site = resolveSiteDataByRoute(ctx.siteConfig.site, pageData.relativePath);
              const title = `${pageData.title || site.title} | ${pageData.description || site.description}`;
              (pageData.frontmatter.head ??= []).push(
                  ["meta", { property: "og:locale", content: site.lang }],
                  ["meta", { property: "og:title", content: title }]
              );
          }
        : undefined,
});
