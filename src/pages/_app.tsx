import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/core'
import { DefaultSeo } from 'next-seo'
import { config } from '../lib/seo'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </Head>
      <DefaultSeo {...config} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
