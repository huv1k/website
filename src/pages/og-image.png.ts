/**
 * Dynamic OG image generation endpoint.
 *
 * Renders a 1200x630 PNG via satori using Space Mono fonts and the author's
 * avatar. Accepts `title` and `description` query parameters to customise
 * the card; falls back to site-wide defaults when omitted.
 *
 * Font files are read from disk and cached in-memory across requests so
 * subsequent invocations skip filesystem I/O. The author avatar is resized
 * with sharp and base64-inlined into the satori HTML template.
 *
 * @module og-image
 */
import type { APIRoute } from 'astro';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';
import { readFile } from 'fs/promises';
import { join } from 'path';

/** Disable prerendering so query parameters are available at request time. */
export const prerender = false;

/** In-memory cache for loaded font ArrayBuffers, populated on first request. */
let fontCache: { latin: ArrayBuffer; latinExt: ArrayBuffer } | null = null;

/**
 * Load Space Mono Latin and Latin Extended font files from `@fontsource`.
 *
 * Results are cached in {@link fontCache} so the filesystem is only hit once
 * per process lifetime. The returned ArrayBuffers are sliced from the
 * underlying Node Buffer to guarantee correct byte offsets for satori.
 *
 * @returns Cached font data for both character sets.
 */
async function getFonts() {
  if (fontCache) {
    return fontCache;
  }

  const fontPathLatin = join(
    process.cwd(),
    'node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff',
  );
  const fontPathLatinExt = join(
    process.cwd(),
    'node_modules/@fontsource/space-mono/files/space-mono-latin-ext-400-normal.woff',
  );

  const latinBuffer = await readFile(fontPathLatin);
  const latinExtBuffer = await readFile(fontPathLatinExt);

  fontCache = {
    latin: latinBuffer.buffer.slice(
      latinBuffer.byteOffset,
      latinBuffer.byteOffset + latinBuffer.byteLength,
    ),
    latinExt: latinExtBuffer.buffer.slice(
      latinExtBuffer.byteOffset,
      latinExtBuffer.byteOffset + latinExtBuffer.byteLength,
    ),
  };
  return fontCache;
}

/**
 * GET handler that generates an OG image as a PNG response.
 *
 * Query parameters:
 * - `title`       – headline text (default: "Huvik - software developer")
 * - `description` – subtitle text (default: "A software developer from the Czech Republic.")
 *
 * The response is served with an immutable `Cache-Control` header (1 year)
 * so CDN edges and browsers can cache the generated image indefinitely.
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    // Get query parameters (only title and description)
    const title = url.searchParams.get('title') || 'Huvik - software developer';
    const description =
      url.searchParams.get('description') || 'A software developer from the Czech Republic.';

    // Author information is fixed
    const author = 'Lukáš Huvar';
    const authorImage = '/lukas-huvar.jpg';

    // Load both fonts for full character support
    const fonts = await getFonts();

    // Load and process the author image
    let avatarBase64 = '';
    try {
      const imagePath = join(process.cwd(), 'public', authorImage.replace(/^\//, ''));
      const imageBuffer = await readFile(imagePath);
      const sharp = (await import('sharp')).default;
      const optimizedImage = await sharp(imageBuffer)
        .resize(80, 80, { fit: 'cover' })
        .png()
        .toBuffer();
      avatarBase64 = `data:image/png;base64,${optimizedImage.toString('base64')}`;
    } catch (e) {
      console.error('Failed to load author image:', e);
    }

    // Build HTML template as string with image embedded
    const htmlTemplate = `
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #ffffff; padding: 80px; font-family: 'Space Mono Latin', 'Space Mono Extended', monospace;">
        <div style="font-size: 64px; font-weight: bold; color: #0a0a0a; margin-bottom: 24px; line-height: 1.2;">
          ${title}
        </div>
        <div style="font-size: 32px; color: #525252; flex: 1; line-height: 1.4;">
          ${description}
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 40px;">
          ${avatarBase64 ? `<img src="${avatarBase64}" style="width: 80px; height: 80px; border-radius: 50%; margin-right: 16px;" />` : ''}
          <div style="font-size: 20px; font-weight: bold; color: #0a0a0a;">
            ${author}
          </div>
        </div>
      </div>
    `;

    // Generate the OG image
    return await satoriAstroOG({
      template: html(htmlTemplate),
      width: 1200,
      height: 630,
    }).toResponse({
      satori: {
        fonts: [
          {
            name: 'Space Mono Latin',
            data: fonts.latin,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Space Mono Extended',
            data: fonts.latinExt,
            weight: 400,
            style: 'normal',
          },
        ],
      },
      response: {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
};
