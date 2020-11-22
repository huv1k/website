import { readdirSync } from 'fs'
import { resolve } from 'path'

export const getBlogSlugs = () =>
  readdirSync(resolve(process.cwd(), 'content')).map((p) =>
    p.replace(/\.mdx/, '')
  )
