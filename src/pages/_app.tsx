import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { config } from '../lib/seo'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js" />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...config} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
