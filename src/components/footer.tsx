import { HStack, Link, VStack, ListItem, Container } from '@chakra-ui/react'

type Link = {
  href: string
  title: string
}

const links: Array<Link> = [
  { href: 'https://mobile.twitter.com/huv1k', title: 'Twitter' },
  { href: 'https://github.com/huv1k', title: 'GitHub' },
]

export const Footer = () => (
  <Container maxWidth="700px">
    <VStack as="footer" alignItems="flex-start" paddingY={10}>
      <HStack as="ul" listStyleType="none">
        {links.map((link) => (
          <ListItem key={link.title}>
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              {link.title}
            </Link>
          </ListItem>
        ))}
      </HStack>
    </VStack>
  </Container>
)
