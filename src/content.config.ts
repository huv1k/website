/**
 * Astro content collection definitions for blog posts and TIL entries.
 *
 * Both collections share the same frontmatter schema. Notable behaviour:
 * - `z.coerce.date()` accepts ISO-8601 strings *and* JS Date objects,
 *   coercing either into a `Date`. This lets authors write `date: 2024-01-15`
 *   in YAML frontmatter without quoting.
 * - `author` defaults to "Lukáš Huvar" when omitted from frontmatter.
 * - `updatedDate` and `authorImage` are optional; pages that don't need them
 *   simply leave them out.
 *
 * @module content.config
 */
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** Blog posts loaded from `src/content/blog/`. */
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Coerced from YAML date or ISO string to a JS Date object. */
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Lukáš Huvar"),
    authorImage: z.string().optional(),
  }),
});

/** "Today I Learned" entries loaded from `src/content/til/`. */
const til = defineCollection({
  loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Coerced from YAML date or ISO string to a JS Date object. */
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Lukáš Huvar"),
    authorImage: z.string().optional(),
  }),
});

export const collections = { blog, til };
