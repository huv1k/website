import fs from 'fs'
import path from 'path'
import { Heading } from '@chakra-ui/react'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import { Layout } from '../../components/layout'
import { components } from '../../components/mdx-components'
import { Subscribe } from '../../components/subscribe'
import { getBlogSlugs } from '../../lib/data'

const root = process.cwd()

export default function BlogPost({
  source,
  frontMatter,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <MDXRemote {...source} components={components} />
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
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  })
  return { props: { source: mdxSource, frontMatter: data, slug } }
}
