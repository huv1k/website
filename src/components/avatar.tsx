import { chakra } from '@chakra-ui/react'
import Image from 'next/image'

export const Avatar = chakra(Image, {
  baseStyle: { maxH: 120, maxW: 120, borderRadius: '100%' },
  shouldForwardProp: (prop) =>
    ['width', 'height', 'layout', 'src', 'alt'].includes(prop),
})
