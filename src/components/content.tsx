import { Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
// eslint-disable-next-line import/no-unresolved
import { useMDXComponent } from 'next-contentlayer/hooks'

interface Props {
  children: React.ReactNode
}

const H2 = (props: Props) => <Heading as="h2" size="md" {...props} />
const A = (props: Props) => <Link fontWeight="bold" {...props} />
const P = (props: Props) => (
  <Text as="p" mt={4} mb={8} lineHeight="tall" {...props} />
)
const UL = (props: Props) => <UnorderedList {...props} />
const LI = (props: Props) => <ListItem {...props} />

export const components = {
  h2: H2,
  a: A,
  p: P,
  ul: UL,
  li: LI,
}

export const Content = ({ source }: { source: string }) => {
  const MDXContent = useMDXComponent(source)

  return <MDXContent components={components} />
}
