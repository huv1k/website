import fs from 'fs'
import path from 'path'
import { Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import matter from 'gray-matter'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import readingTime from 'reading-time'
import { Layout } from '../components/layout'
import { ViewCounter } from '../components/view-counter'

const root = process.cwd()

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Heading as="h1" size="2xl">
        Blog
      </Heading>
      <Text>My two cents about different topics going trought my mind</Text>
      <VStack alignItems="flex-start" marginTop={10} spacing={6}>
        {posts
          .sort((a, b) => {
            return (
              new Date(b.frontMatter.date).getTime() -
              new Date(a.frontMatter.date).getTime()
            )
          })
          .map((post) => (
            <VStack alignItems="flex-start" key={post.slug} width="100%">
              <HStack justifyContent="space-between" width="100%">
                <Link href={`/blog/${post.slug}`} passHref>
                  <Heading size="lg" as="a">
                    {post.frontMatter.title}
                  </Heading>
                </Link>
                <Text fontSize="sm" color="gray.500">
                  {post.readingTime.text}
                </Text>
              </HStack>
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>{post.frontMatter.description}</Text>
                <ViewCounter slug={post.slug} track={false} />
              </Flex>
            </VStack>
          ))}
      </VStack>
    </Layout>
  )
}
export async function getStaticProps() {
  const contentRoot = path.join(root, 'content')
  const posts = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), 'utf8')
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
      readingTime: readingTime(content),
    }
  })
  return { props: { posts } }
}
