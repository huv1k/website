import { ChakraProvider } from '@chakra-ui/react'
import splitbee from '@splitbee/web'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { config } from '../lib/seo'
import '../styles.css'

splitbee.init({
  scriptUrl: '/bee.js',
  apiUrl: '/_hive',
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <Head>
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
