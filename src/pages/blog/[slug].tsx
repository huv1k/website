import { GetStaticProps, InferGetStaticPropsType } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { Layout } from '../../components/layout'
import { Heading } from '@chakra-ui/core'
import mdxPrism from 'mdx-prism'
import { components } from '../../components/mdx-components'

const root = process.cwd()

export default function BlogPost({
  mdxSource,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = hydrate(mdxSource, {
    components,
  })
  return (
    <Layout>
      <Heading as="h1" size="xl">
        {frontMatter.title}
      </Heading>
      {content}
    </Layout>
  )
}
export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
      .readdirSync(path.join(root, 'content'))
      .map((p) => ({ params: { slug: p.replace(/\.mdx/, '') } })),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = fs.readFileSync(
    path.join(root, 'content', `${params?.slug}.mdx`),
    'utf8'
  )
  const { data, content } = matter(source)
  const mdxSource: string = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  })
  return { props: { mdxSource, frontMatter: data } }
}
