import {
  Container,
  useColorMode,
  IconButton,
  Icon,
  HStack,
  Button,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  href: string
  children: string
}

const NavLink = ({ href, children }: Props) => {
  const { asPath: pathname } = useRouter()

  return (
    <Link href={href} passHref>
      <Button
        size="sm"
        as="a"
        variant="ghost"
        fontWeight={href === pathname ? 'bold' : 'normal'}
      >
        {children}
      </Button>
    </Link>
  )
}

export const Navigation = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Container
      display="flex"
      as="nav"
      maxWidth="900px"
      width="100%"
      justifyContent="flex-end"
      alignItems="center"
      pt={8}
      pb={8}
      mx="auto"
    >
      <HStack spacing={4}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <IconButton
          size="md"
          icon={
            <Icon
              boxSize="20px"
              as={colorMode === 'light' ? MoonIcon : SunIcon}
            />
          }
          aria-label={`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } theme`}
          onClick={toggleColorMode}
        />
      </HStack>
    </Container>
  )
}
