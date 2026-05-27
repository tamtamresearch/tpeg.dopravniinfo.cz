import llmstxtPlugin from "vitepress-plugin-llmstxt";
import { defineConfig, resolveSiteDataByRoute } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "vitepress-plugin-group-icons";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import footnote from "markdown-it-footnote";
import { loadMainData } from "../lib/dataLoader.js";
// TODO rework: Remove
// import { confYamlCompilerPlugin, compileYamlFiles } from "./confYamlCompiler.js"; // Import the plugin

const prod = !!process.env.NETLIFY || !!process.env.CI; // Test for Netlify and GitLab CI/CD
const extensionsNotHandledByVitePress = "xlsx,docx,zip,pdf";

// Notes:
//   VITEPRESS_IGNORE_DEAD_LINKS - set to ignore dead links, use for testing only

// Add to the list of file extensions not routed by VitePress for build
process.env.VITE_EXTRA_EXTENSIONS = extensionsNotHandledByVitePress;

// Compile files as soon, as possible
// TODO rework: Remove
// await compileYamlFiles();

// Function to generate sidebar from `topLevelKey` in YAML
function generateSidebarFromYaml(language, topLevelKey) {
    // The key must follow this structure:
    //    configFile.<topLevelKey>.<language>.name
    try {
        // Read the YAML configuration file
        const data = loadMainData();

        const topLevelItems = data[topLevelKey];

        // Extract data for sidebar
        if (!topLevelItems) {
            console.warn(`No doto for ${topLevelKey} found in YAML`);
            return [];
        }

        const items = Object.keys(topLevelItems).map((itemKey) => {
            const item = topLevelItems[itemKey];
            const name = item.name?.[language] || itemKey;

            return {
                text: name,
                link: `./${itemKey}`,
            };
        });

        console.log(`[Sidebar] ${items.length} items for '${topLevelKey}', language: '${language}'`);
        return items;
    } catch (error) {
        console.warn(`Could not generate sidebar for ${topLevelKey} from YAML:`, error.message);
        return [];
    }
}

export default defineConfig({
    title: "Czech NAP",

    rewrites: {
        "en/:rest*": ":rest*",
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: !!process.env.VITEPRESS_IGNORE_DEAD_LINKS,

    markdown: {
        math: true,
        config(md) {
            // // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
            // const fence = md.renderer.rules.fence
            // md.renderer.rules.fence = function (tokens, idx, options, env, self) {
            //     const {localeIndex = 'root'} = env
            //     const codeCopyButtonTitle = (() => {
            //         switch (localeIndex) {
            //             case 'es':
            //                 return 'Copiar código'
            //             case 'fa':
            //                 return 'کپی کد'
            //             case 'ko':
            //                 return '코드 복사'
            //             case 'pt':
            //                 return 'Copiar código'
            //             case 'ru':
            //                 return 'Скопировать код'
            //             case 'zh':
            //                 return '复制代码'
            //             default:
            //                 return 'Copy code'
            //         }
            //     })()
            //     return fence(tokens, idx, options, env, self).replace(
            //         '<button title="Copy Code" class="copy"></button>',
            //         `<button title="${codeCopyButtonTitle}" class="copy"></button>`
            //     )
            // }
            md.use(groupIconMdPlugin);
            md.use(footnote);
        },
    },

    sitemap: {
        hostname: "https://vitepress.dev",
        transformItems(items) {
            return items.filter((item) => !item.url.includes("migration"));
        },
    },

    head: [
        ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.png" }],
        ["meta", { name: "theme-color", content: "#5f67ee" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: "Czech NAP" }],
        ["meta", { property: "og:url", content: "https://registr.dopravniinfo.cz/" }],
    ],

    themeConfig: {
        logo: { src: "/logo.png", width: 24, height: 24 },

        socialLinks: [{ icon: "github", link: "https://github.com/" }],

        search: {
            provider: "local",
            // TODO: Remove
            // options: {
            //   appId: '8J64VVRP8K',
            //   apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
            //   indexName: 'vitepress',
            //   askAi: 'YaVSonfX5bS8'
            // }
        },
    },

    locales: {
        root: {
            label: "English",
            lang: "en-US",
            title: "Czech NAP",
            description:
                "National Traffic Information Registry provides information to organisations interested in traffic data subscription.",

            themeConfig: {
                // Navigation bar
                nav: [
                    { text: "Home", link: "/" },
                    { text: "Providers", link: "/providers/" },
                    { text: "Sources", link: "/sources/" },
                    { text: "Protocols", link: "/protocols/" },
                    { text: "Formats", link: "/formats/" },
                    { text: "About", link: "/about/" },
                ],

                // Sidebar configuration
                sidebar: {
                    "/sources/": [
                        {
                            text: "Sources",
                            collapsed: false,
                            items: generateSidebarFromYaml("en", "sources"),
                        },
                    ],
                    "/protocols/": [
                        {
                            text: "Protocols",
                            collapsed: false,
                            items: generateSidebarFromYaml("en", "protocols"),
                        },
                    ],
                    "/formats/": [
                        {
                            text: "Formats",
                            collapsed: false,
                            items: generateSidebarFromYaml("en", "formats"),
                        },
                    ],
                    "/providers/": [
                        {
                            text: "Providers",
                            collapsed: false,
                            items: generateSidebarFromYaml("en", "providers"),
                        },
                    ],
                    "/about/": [
                        {
                            text: "About",
                            collapsed: false,
                            items: [
                                { text: "Systems and Participants", link: "/about/systems" },
                                { text: "Types of Information", link: "/about/structure" },
                                { text: "Scope and Status", link: "/about/scope" },
                                { text: "FAQ", link: "/about/faq" },
                                { text: "Contacts", link: "/about/contacts" },
                                { text: "Providers registration", link: "/about/registration" },
                            ],
                        },
                    ],
                },

                // // Social links
                // socialLinks: [
                //     {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
                // ],

                // Footer
                footer: {
                    message: "Czech National Traffic Information Registry",
                    copyright: "",
                },
            },
        },
        cs: {
            label: "Čeština",
            lang: "cs-CZ",
            title: "Registr dopravních informací",
            description: "Národní registr dopravních informací České republiky",

            themeConfig: {
                // Navigation bar
                nav: [
                    { text: "Domů", link: "/cs/" },
                    { text: "Poskytovatelé", link: "/cs/providers/" },
                    { text: "Zdroje", link: "/cs/sources/" },
                    { text: "Protokoly", link: "/cs/protocols/" },
                    { text: "Formáty", link: "/cs/formats/" },
                    { text: "O stránce", link: "/cs/about/" },
                ],

                // Sidebar configuration
                sidebar: {
                    "/cs/sources/": [
                        {
                            text: "Zdroje",
                            collapsed: false,
                            items: generateSidebarFromYaml("cs", "sources"),
                        },
                    ],
                    "/cs/protocols/": [
                        {
                            text: "Protokoly",
                            collapsed: false,
                            items: generateSidebarFromYaml("cs", "protocols"),
                        },
                    ],
                    "/cs/formats/": [
                        {
                            text: "Formáty",
                            collapsed: false,
                            items: generateSidebarFromYaml("cs", "formats"),
                        },
                    ],
                    "/cs/providers/": [
                        {
                            text: "Poskytovatelé",
                            collapsed: false,
                            items: generateSidebarFromYaml("cs", "providers"),
                        },
                    ],
                    "/cs/about/": [
                        {
                            text: "O stránce",
                            collapsed: false,
                            items: [
                                { text: "Systémy a účastníci", link: "/cs/about/systems" },
                                { text: "Typy informací v Registru", link: "/cs/about/structure" },
                                { text: "Stav implementace", link: "/cs/about/scope" },
                                { text: "FAQ", link: "/cs/about/faq" },
                                { text: "Kontakty", link: "/cs/about/contacts" },
                                {
                                    text: "Registrace nového datového zdroje a poskytovatele",
                                    link: "/cs/about/registration",
                                },
                            ],
                        },
                    ],
                },

                // // Social links
                // socialLinks: [
                //     {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
                //     {icon: 'twitter', link: 'https://twitter.com/vite_js'},
                //     {icon: 'discord', link: 'https://discord.com/invite/HBherRA'}
                // ],

                // Footer
                footer: {
                    message: "Czech National Traffic Information Registry",
                    copyright: "",
                },
            },
        },
    },

    vite: {
        define: {
            // Add to the list of file extensions not routed by VitePress
            "import.meta.env.VITE_EXTRA_EXTENSIONS": JSON.stringify(extensionsNotHandledByVitePress),
        },
        resolve: {
            // To fix not working dev mode on Windows when run from cmd.exe
            preserveSymlinks: true,
        },
        plugins: [
            // TODO rework: Remove
            // confYamlCompilerPlugin(),
            llmstxtPlugin(),
            groupIconVitePlugin({
                customIcon: {
                    vitepress: localIconLoader(import.meta.url, "../public/logo.png"),
                    firebase: "logos:firebase",
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
                    cs: {
                        btnPlaceholder: "Vyhledat",
                        placeholder: "Hledat...",
                        emptyText: "Nenalezeno",
                        heading: "Celkem: {{searchResult}} nalezeno.",
                    },
                },
            }),
        ],
        experimental: {
            enableNativePlugin: true,
        },
    },

    // // Transform page data dynamically
    // async transformPageData(pageData, ctx) {
    //     // You can also do runtime preprocessing here if needed
    //     console.log("Transforming page data", pageData, "Context:", null);
    //
    //     // Only process files in certain directories
    //     if (!pageData.filePath?.includes('/cs/providers/')) {
    //         return pageData
    //     }
    //
    //     // // Only process if frontmatter says so
    //     // if (pageData.frontmatter?.template !== true) {
    //     //     return pageData
    //     // }
    //
    //     // Process the template
    //     return processTemplate(pageData)
    // }

    // Add `og:locale` and `og:title` metadata to pages
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
