import { Heading } from '@chakra-ui/react'
import { allTodayILearneds } from 'contentlayer/generated'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Content } from '../../components/content'
import { Layout } from '../../components/layout'
import { PostHeader } from '../../components/post-header'

export default function TodayILearned({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, slug } = post
  return (
    <Layout>
      <Heading as="h1" size="xl" mb={2}>
        {title}
      </Heading>
      <PostHeader slug={slug} />
      <Content source={post.body.code} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = allTodayILearneds.map((post) => post.url)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allTodayILearneds.find((post) => post.slug === params?.slug)

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
