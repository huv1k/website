import fs from 'fs'
import path from 'path'
import { Heading, Flex, Text, HStack } from '@chakra-ui/react'
import matter from 'gray-matter'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import { Layout } from '../../components/layout'
import { components } from '../../components/mdx-components'
import { Subscribe } from '../../components/subscribe'
import { ViewCounter } from '../../components/view-counter'
import { getBlogSlugs } from '../../lib/data'

const root = process.cwd()

export default function BlogPost({
  source,
  frontMatter,
  slug,
  readingTime,
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
      <Heading as="h1" size="xl" mb={2}>
        {title}
      </Heading>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold">Lukáš Huvar</Text>
        <HStack>
          <Text fontSize="sm" color="gray.500">
            {readingTime}
          </Text>
          <ViewCounter slug={slug} />
        </HStack>
      </Flex>
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
      rehypePlugins: [
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        rehypePrism,
        rehypeSlug,
      ],
    },
  })
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug,
      readingTime: readingTime(content).text,
    },
  }
}
