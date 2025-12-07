import type { APIRoute } from 'astro';
import { satoriAstroOG } from 'satori-astro';
import { html } from 'satori-html';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Cache font data to avoid repeated file reads
let fontCache: { latin: ArrayBuffer; latinExt: ArrayBuffer } | null = null;

// Load both Latin and Latin Extended fonts
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

export const GET: APIRoute = async ({ url }) => {
  try {
    // Get query parameters (only title and description)
    const title = url.searchParams.get('title') || 'Huvik - software developer';
    const description =
      url.searchParams.get('description') ||
      'A software developer from the Czech Republic.';

    // Author information is fixed
    const author = 'Lukáš Huvar';
    const authorImage = '/lukas-huvar.jpg';

    // Load both fonts for full character support
    const fonts = await getFonts();

    // Load and process the author image
    let avatarBase64 = '';
    try {
      const imagePath = join(
        process.cwd(),
        'public',
        authorImage.replace(/^\//, ''),
      );
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
