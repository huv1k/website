import {
  Container,
  IconButton,
  Icon,
  HStack,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  href: string
  children: string
}

const NavLink = ({ href, children }: Props) => {
  const { asPath: pathname } = useRouter()

  return (
    <Button
      size="sm"
      as={Link}
      variant="ghost"
      href={href}
      fontWeight={href === pathname ? 'bold' : 'normal'}
    >
      {children}
    </Button>
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
