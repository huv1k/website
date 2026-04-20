/** @jsxRuntime automatic */
/** @jsxImportSource react */
/**
 * JSX template for the runtime OG image.
 *
 * Lives outside `src/pages/` because Astro only accepts `.astro`, `.md`,
 * `.mdx`, `.html`, `.js`, and `.ts` as page entries — `.tsx` is rejected
 * there. The endpoint at `src/pages/og-image.png.ts` imports this helper
 * and hands the element to `cf-workers-og`'s `ImageResponse.create`.
 */
import type { ReactElement } from 'react';

export type OGTemplateProps = {
  title: string;
  description: string;
  avatarUrl: string;
};

export function OGTemplate({ title, description, avatarUrl }: OGTemplateProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        padding: '80px',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 700,
          color: '#0a0a0a',
          marginBottom: 24,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 32,
          color: '#525252',
          flex: 1,
          lineHeight: 1.4,
        }}
      >
        {description}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <img
          src={avatarUrl}
          style={{ width: 80, height: 80, borderRadius: '50%', marginRight: 16 }}
        />
        <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: '#0a0a0a' }}>
          Lukáš Huvar
        </div>
      </div>
    </div>
  );
}
