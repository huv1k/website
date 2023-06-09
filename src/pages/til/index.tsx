import { HStack, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { allTodayILearneds } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'

import { Layout } from '../../components/layout'
import { ViewCounter } from '../../components/view-counter'
import { formatDate, sortByDate } from '../../utils'

export default function TodayILearned({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Heading mb={4}>Today I Learned</Heading>
      <Text>
        Welcome to my <b>Today I Learned</b> section, where I share a collection
        of notes on things I&apos;ve recently learned or want to revisit in the
        future. This section is also a resource for others who may have similar
        questions - if there&apos;s something you&apos;ve been wondering about,
        chances are I&apos;ve covered it here. I hope this collection helps you
        learn and grow, just as it does for me.
      </Text>
      <VStack alignItems="flex-start" marginTop={10} spacing={0}>
        {posts.map((post) => (
          <HStack
            key={post.url}
            width="100%"
            spacing={8}
            justifyContent="space-between"
          >
            <Link fontSize="xl" fontWeight="bold" as={NextLink} href={post.url}>
              {post.title}
            </Link>
            <HStack>
              <ViewCounter slug={post.slug} track={false} />
              <Text fontWeight="bold">-</Text>
              <Text>{formatDate(post.date)}</Text>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = allTodayILearneds.sort(sortByDate)
  return { props: { posts } }
}
