import { Heading, Flex, Text, HStack } from '@chakra-ui/react'
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { allPosts } from 'contentlayer/generated'

import { Avatar } from '../../components/avatar'
import { Content } from '../../components/content'
import { Layout } from '../../components/layout'
import { ReadingTime } from '../../components/reading-time'
import { Subscribe } from '../../components/subscribe'
import { ViewCounter } from '../../components/view-counter'

export default function BlogPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = post.title
  const description = post.description
  const date = new Date(post.date).toISOString()
  const url = `https://huvik.dev/blog/${post.slug}`
  const images = post.image
    ? [
        {
          url: `https://huvik.dev/${post.image}`,
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
        <HStack>
          <Avatar
            alt="Lukáš Huvar"
            src="/lukas-huvar.jpg"
            width={24}
            height={24}
          />
          <Text fontWeight="bold">Lukáš Huvar</Text>
        </HStack>
        <HStack>
          <ReadingTime time={post.readingTime} />
          <ViewCounter slug={post.slug} />
        </HStack>
      </Flex>
      <Content source={post.body.code} />
      <Subscribe />
    </Layout>
  )
}
export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((post) => post.slug === params?.slug)

  return {
    props: {
      // We can change this type, because we know that the post exists,
      // otherwise we are redirected to 404 page.
      post: post!,
    },
    ...(!post
      ? {
          redirect: {
            destination: '/404',
          },
        }
      : {}),
  }
}
