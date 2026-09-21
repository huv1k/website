import type { APIRoute } from 'astro';
import { createLocalizedRss } from '../lib/rss';

export const GET: APIRoute = ({ site }) => createLocalizedRss('en', site);
