import { Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import * as React from 'react'

import { Footer } from './footer'
import { Navigation } from './navigation'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const router = useRouter()
  return (
    <>
      <Navigation />
      <motion.main
        key={router.route}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <Container maxWidth="700px" minHeight="calc(100vh - 88px - 90px)">
          {children}
        </Container>
      </motion.main>
      <Footer />
    </>
  )
}
