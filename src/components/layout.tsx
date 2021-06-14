import { Container } from '@chakra-ui/react'
import * as React from 'react'
import { Footer } from './footer'
import { Navigation } from './navigation'

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
