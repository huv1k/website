import {
  Code,
  Heading,
  Link,
  Text,
  ChakraProvider,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { MdxRemote } from 'next-mdx-remote/types'

interface Props {
  children: React.ReactNode
}

export const components: MdxRemote.Components = {
  // Hotfix for missing providers in mdx-remote
  wrapper: (props: Props) => <ChakraProvider resetCSS {...props} />,
  h2: (props: Props) => <Heading as="h2" size="md" {...props} />,
  a: (props: Props) => <Link fontWeight="bold" {...props} />,
  p: (props: Props) => (
    <Text as="p" mt={4} mb={8} lineHeight="tall" {...props} />
  ),
  ul: (props: Props) => <UnorderedList {...props} />,
  li: (props: Props) => <ListItem {...props} />,
  inlineCode: (props: Props) => <Code {...props} />,
}
