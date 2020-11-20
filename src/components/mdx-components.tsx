import {
  Code,
  Heading,
  Link,
  Text,
  ChakraProvider,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

export const components = {
  // Hotfix for missing providers in mdx-remote
  wrapper: (props) => <ChakraProvider resetCSS {...props} />,
  h2: (props) => <Heading as="h2" size="md" {...props} />,
  a: (props) => <Link fontWeight="bold" {...props} />,
  p: (props) => <Text as="p" mt={4} mb={8} lineHeight="tall" {...props} />,
  ul: (props) => <UnorderedList {...props} />,
  li: (props) => <ListItem {...props} />,
  inlineCode: (props) => <Code {...props} />,
}
