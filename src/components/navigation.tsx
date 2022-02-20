import { Link as A, Flex } from '@chakra-ui/react'
import Link from 'next/link'

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
