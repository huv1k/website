// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { h } from "hastscript";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://huvik.dev",
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  experimental: {
    fonts: [
      {
        name: "Space Mono",
        provider: fontProviders.fontsource(),
        cssVariable: "--font-space-mono",
        weights: [400, 700],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        {
          name: "transformer-meta",
          pre() {
            // This method means that we will modifiy the <pre> element that will be generated
            const metaRaw = this.options.meta?.__raw;
            const meta: Record<string, string> = {};
            if (metaRaw) {
              const parts = metaRaw.split(/\s+/);
              for (const part of parts) {
                const [key, value] = part.split("=");
                if (key && value) {
                  meta[key] = value;
                }
              }
            }
            (this.meta as Record<string, string>) = meta;
          },
        },
        {
          name: "code-title",
          pre(node) {
            const meta = this.meta as Record<string, string>;
            if (meta.title) {
              const titleDiv = h(
                "div",
                {
                  class: "bg-gray-200 p-1 rounded-t-md",
                },
                meta.title,
              );
              node.children.unshift(titleDiv);
            }
          },
        },
        {
          name: "copy-button",
          code(node) {
            // Create copy button placeholder
            const copyButton = h(
              "button",
              {
                class:
                  "copy-code-button absolute top-2 right-2 rounded p-1 hover:bg-gray-200 transition-colors w-6 h-6 flex items-center justify-center",
                "aria-label": "Copy code to clipboard",
                "data-copied": "false",
              },
              [
                h(
                  "svg",
                  {
                    class: "copy-icon w-3.5 h-3.5 text-gray-500",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                  [
                    h("rect", {
                      width: "14",
                      height: "14",
                      x: "8",
                      y: "8",
                      rx: "2",
                      ry: "2",
                    }),
                    h("path", {
                      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                    }),
                  ],
                ),
                h(
                  "svg",
                  {
                    class: "check-icon w-3.5 h-3.5 text-green-600 dark:text-green-400 hidden",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                  },
                  [h("path", { d: "M20 6 9 17l-5-5" })],
                ),
              ],
            );

            node.children.push(copyButton);
          },
        },
      ],
    },
  },
});
