import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@maynkudu/hooks",
  description: "Practical React hooks, clean and documented.",
  base: "/hooks/",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Hooks", link: "/hooks/" },
    ],

    sidebar: {
      "/hooks/": [
        {
          text: "Hooks",
          items: [
            { text: "useWindow", link: "/hooks/useWindow" },
            { text: "useLocalStorage", link: "/hooks/useLocalStorage" },
            { text: "useDebounce", link: "/hooks/useDebounce" },
          ],
        },
      ],
    },
  },
});
