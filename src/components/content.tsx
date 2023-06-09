import {
  Box,
  Heading,
  Icon,
  IconButton,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ReactElement, cloneElement, useCallback, useRef } from 'react'

interface Props {
  children?: React.ReactNode
}

const H2 = (props: Props) => (
  <Heading as="h2" size="md" mt={2} mb={2} {...props} />
)
const A = (props: Props) => <Link fontWeight="bold" {...props} />
const P = (props: Props) => <Text as="p" mt={4} mb={4} {...props} />
const UL = (props: Props) => <UnorderedList {...props} />
const LI = (props: Props) => <ListItem {...props} />

const Pre = (props: Props) => {
  const codeRef = useRef<HTMLElement>(null)
  const toast = useToast()
  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(
      codeRef.current?.textContent ?? 'Failed to copy'
    )
    toast({
      title: 'Copied to clipboard',
      position: 'bottom-right',
      duration: 700,
      variant: 'subtle',
    })
  }, [toast])

  return (
    <Box as="pre" position="relative" {...props}>
      <IconButton
        size="xs"
        aria-label="Copy code"
        icon={<Icon as={ClipboardIcon} />}
        position="absolute"
        right={2}
        top={2}
        onClick={copyCode}
      ></IconButton>
      {cloneElement(props.children as ReactElement, { ref: codeRef })}
    </Box>
  )
}

export const components = {
  h2: H2,
  a: A,
  p: P,
  ul: UL,
  li: LI,
  pre: Pre,
}

export const Content = ({ source }: { source: string }) => {
  const MDXContent = useMDXComponent(source)

  return <MDXContent components={components} />
}
