import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Lukáš Huvar"),
    authorImage: z.string().optional(),
  }),
});

const til = defineCollection({
  // Load Markdown and MDX files in the `src/content/til/` directory.
  loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Lukáš Huvar"),
    authorImage: z.string().optional(),
  }),
});

export const collections = { blog, til };
