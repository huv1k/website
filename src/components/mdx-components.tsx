import {
  ChakraProvider,
  Code,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const Wrapper = (props: Props) => <ChakraProvider resetCSS {...props} />
const H2 = (props: Props) => <Heading as="h2" size="md" {...props} />
const A = (props: Props) => <Link fontWeight="bold" {...props} />
const P = (props: Props) => (
  <Text as="p" mt={4} mb={8} lineHeight="tall" {...props} />
)
const UL = (props: Props) => <UnorderedList {...props} />
const LI = (props: Props) => <ListItem {...props} />
const InlineCode = (props: Props) => <Code {...props} />

export const components = {
  // Hotfix for missing providers in mdx-remote
  wrapper: Wrapper,
  h2: H2,
  a: A,
  p: P,
  ul: UL,
  li: LI,
  inlineCode: InlineCode,
}
