import * as React from 'react'
import { Navigation } from './navigation'
import { Container } from '@chakra-ui/core'
import { Footer } from './footer'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <Container maxWidth="700px" minHeight="calc(100vh - 88px - 104px)">
        {children}
      </Container>
      <Footer />
    </>
  )
}
