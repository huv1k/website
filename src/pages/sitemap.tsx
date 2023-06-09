import { allPosts, allTodayILearneds } from 'contentlayer/generated'
import { GetServerSideProps } from 'next'

const hostname = 'https://huvik.dev'

type EntryConfig = {
  pathname: string
  priority?: number
}

const getSitemapEntry = ({ pathname, priority = 0.5 }: EntryConfig) => {
  return `
      <url>
          <loc>${hostname}${pathname}</loc>
          <priority>${priority}</priority>
      </url>
  `
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const entries = allPosts.map(({ url }) =>
    getSitemapEntry({
      pathname: url,
      priority: 0.8,
    })
  )
  entries.push(
    ...allTodayILearneds.map(({ url }) =>
      getSitemapEntry({ pathname: url, priority: 0.7 })
    )
  )
  entries.push(getSitemapEntry({ pathname: '/til' }))
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
