import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type LocalizedCollection = 'blog' | 'til';

export function getEntrySlug(entry: { id: string }): string {
  return entry.id.replace(/^cs\//, '');
}

export async function getLocalizedEntries<Collection extends LocalizedCollection>(
  collection: Collection,
  locale: Locale,
): Promise<Array<CollectionEntry<Collection>>> {
  const entries = await getCollection(collection);
  return entries.filter((entry) => entry.data.locale === locale);
}

export function hasTranslation(
  entries: Array<CollectionEntry<'blog'> | CollectionEntry<'til'>>,
  slug: string,
  locale: Locale,
): boolean {
  return entries.some((entry) => entry.data.locale === locale && getEntrySlug(entry) === slug);
}
