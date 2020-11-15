import Link from 'next/link'
import { Flex, Link as A } from '@chakra-ui/react'

type Props = {
  href: string
  children: string
}

const NavLink = ({ href, children }: Props) => (
  <Link href={href} passHref>
    <A paddingX="2">{children}</A>
  </Link>
)

export const Navigation = () => {
  return (
    <Flex
      as="nav"
      maxWidth="900px"
      width="100%"
      justifyContent="flex-end"
      pt={8}
      pb={8}
      mx="auto"
    >
      {/* <NavLink href="/reading-list">Reading list</NavLink> */}
      <NavLink href="/">Home</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </Flex>
  )
}
