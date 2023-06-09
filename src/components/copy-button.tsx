import { Icon, IconButton, useClipboard, useToast } from '@chakra-ui/react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

type Props = {
  code: string
}

export const CopyButton = ({ code }: Props) => {
  const toast = useToast()
  const { onCopy } = useClipboard(code)
  return (
    <IconButton
      aria-label="Copy code to clipboard"
      icon={<Icon boxSize={4} as={ClipboardDocumentIcon} />}
      position="absolute"
      size="xs"
      top={2}
      right={2}
      onClick={() => {
        onCopy()
        toast({
          position: 'bottom-right',
          title: 'Copied',
          status: 'success',
          duration: 2000,
        })
      }}
    />
  )
}
