import { Heading } from '@chakra-ui/react'
import { allPosts } from 'contentlayer/generated'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'

import { Content } from '../../components/content'
import { Layout } from '../../components/layout'
import { PostHeader } from '../../components/post-header'

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
      <PostHeader slug={post.slug} readingTime={post.readingTime} />
      <Content source={post.body.code} />
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
