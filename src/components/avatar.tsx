import { chakra } from '@chakra-ui/react'
import Image from 'next/image'

export const Avatar = chakra(Image, {
  baseStyle: { maxH: 6, maxW: 6, borderRadius: '100%' },
  shouldForwardProp: (prop) =>
    ['width', 'height', 'layout', 'src', 'alt'].includes(prop),
})
