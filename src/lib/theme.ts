import { ChakraTheme, type ThemeConfig, extendTheme } from '@chakra-ui/react'

export const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = (extend?: Partial<ChakraTheme>) =>
  extendTheme({
    ...extend,
    config,
  })
