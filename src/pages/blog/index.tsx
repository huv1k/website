import { Heading, Text, VStack, HStack } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { Layout } from '../../components/layout'
import { ReadingTime } from '../../components/reading-time'
import { ViewCounter } from '../../components/view-counter'
import { formatDate } from '../../utils'

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
        {posts.map((post) => (
          <VStack alignItems="flex-start" key={post.url} width="100%">
            <Heading size="lg" as={Link} href={post.url}>
              {post.title}
            </Heading>
            <HStack spacing={8}>
              <Text fontSize="sm">
                {formatDate(new Date(post.date))}
              </Text>
              <ReadingTime time={post.readingTime} />
              <ViewCounter slug={post.slug} track={false} />
            </HStack>
            <Text>{post.description}</Text>
          </VStack>
        ))}
      </VStack>
    </Layout>
  )
}
export async function getStaticProps() {
  const posts = allPosts.sort((a, d) => {
    return new Date(d.date).getTime() - new Date(a.date).getTime()
  })
  return { props: { posts } }
}
