import { GetServerSideProps } from 'next'
import { getBlogSlugs } from '../lib/data'

const hostname = 'https://huvik.dev'

const getSitemapEntry = ({ pathname, priority = 0.5 }) => {
  return `
      <url>
          <loc>${hostname}${pathname}</loc>
          <priority>${priority}</priority>
      </url>
  `
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const slugs = getBlogSlugs()

  const entries = slugs.map((slug) =>
    getSitemapEntry({
      pathname: `/blog/${slug}`,
      priority: 0.8,
    })
  )
  entries.push(
    getSitemapEntry({
      pathname: '/blog',
    })
  )
  entries.push(
    getSitemapEntry({
      pathname: '/',
    })
  )

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${entries.join('\n')}
    </urlset>      
`.trim()

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  })
  res.end(sitemap)

  return { props: {} }
}

const SiteMap = () => null

export default SiteMap
