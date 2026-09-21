import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLocalePath, siteCopy, type Locale } from '../i18n';
import { getEntrySlug, getLocalizedEntries } from './content';

export async function createLocalizedRss(
  locale: Locale,
  site: APIContext['site'],
): Promise<Response> {
  const posts = (await getLocalizedEntries('blog', locale)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const copy = siteCopy[locale];
  const feedSite = new URL(getLocalePath(locale, '/'), site ?? 'https://huvik.dev');

  return rss({
    title: copy.metadata.siteTitle,
    description: copy.metadata.siteDescription,
    site: feedSite,
    trailingSlash: false,
    customData: `<language>${copy.languageCode}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getLocalePath(locale, `/blog/${getEntrySlug(post)}`),
    })),
  });
}
