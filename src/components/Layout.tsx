import * as React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { siteMeta } from '../config'

interface Props {
  children: JSX.Element
  title?: string
  description?: string
  imageUrl?: string
}

export const Layout = ({ children, title, description, imageUrl }: Props) => {
  const formatedTitle = title ? `${title} - Huvik` : siteMeta.title
  const formatedDescription = description ? description : siteMeta.description

  return (
    <>
      <Head>
        <title>{formatedTitle}</title>
        <meta property="description" content={formatedDescription} />
        <meta property="og:title" content={formatedTitle} />
        <meta property="og:description" content={formatedDescription} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <Main>{children}</Main>
    </>
  )
}

const Main = styled.div`
  background: black;
`
