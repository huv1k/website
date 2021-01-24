import { GetStaticProps, InferGetStaticPropsType } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { NextSeo } from 'next-seo'
import { Layout } from '../../components/layout'
import { Heading } from '@chakra-ui/react'
import mdxPrism from 'mdx-prism'
import { components } from '../../components/mdx-components'
import { Content } from '../../components/content'
import { Subscribe } from '../../components/subscribe'
import { getBlogSlugs } from '../../lib/data'

const root = process.cwd()

export default function BlogPost({
  mdxSource,
  frontMatter,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = hydrate(mdxSource, {
    components,
  })

  const title = frontMatter.title
  const description = frontMatter.description
  const date = new Date(frontMatter.date).toISOString()
  const url = `https://huvik.dev/blog/${slug}`
  const images = frontMatter.image
    ? [
        {
          url: `https://huvik.dev/${frontMatter.image}`,
          alt: title,
        },
      ]
    : []

  return (
    <Layout>
      <NextSeo
        title={`${title} - Huvik`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'Article',
          article: {
            publishedTime: date,
          },
          url,
          title,
          description,
          images,
        }}
      />
      <Heading as="h1" size="xl">
        {title}
      </Heading>
      <Content content={content} />
      <Subscribe />
    </Layout>
  )
}
export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getBlogSlugs().map((slug) => ({
      params: { slug },
    })),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug

  const source = fs.readFileSync(
    path.join(root, 'content', `${slug}.mdx`),
    'utf8'
  )
  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
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
  return { props: { mdxSource, frontMatter: data, slug } }
}
