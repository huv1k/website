/**
 * Runtime OG image generation on Cloudflare Workers.
 *
 * Uses `cf-workers-og` (satori + resvg-wasm) so the endpoint works on the
 * Workers runtime — no `fs`, `sharp`, or `process.cwd()` required. Fonts
 * are fetched from Google Fonts on first request and cached via the
 * library's `cache` helper (pass the Workers `ctx` so refetches are rare).
 *
 * Query parameters:
 * - `title`       – headline text (default: site title)
 * - `description` – subtitle text (default: site description)
 *
 * The JSX template lives in `src/lib/og-template.tsx` — Astro rejects `.tsx`
 * inside `src/pages/`, so the element is built there and imported here.
 *
 * @module og-image
 */
import type { APIRoute } from 'astro';
import { ImageResponse, GoogleFont, cache } from 'cf-workers-og';
import { OGTemplate } from '../lib/og-template';

/** Disable prerendering so query params and the Workers runtime are available. */
export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
  cache.setExecutionContext(locals.cfContext);

  const title = url.searchParams.get('title') || 'Huvik - software developer';
  const description =
    url.searchParams.get('description') || 'A software developer from the Czech Republic.';

  const avatarUrl = new URL('/lukas-huvar.jpg', url.origin).toString();

  return ImageResponse.create(
    OGTemplate({ title, description, avatarUrl }),
    {
      width: 1200,
      height: 630,
      fonts: [
        new GoogleFont('Space Mono', { weight: 400 }),
        new GoogleFont('Space Mono', { weight: 700 }),
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  );
};
