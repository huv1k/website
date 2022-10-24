import { ChakraProvider } from '@chakra-ui/react'
import splitbee from '@splitbee/web'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { config } from '../lib/seo'
import '../styles/global.css'

splitbee.init({
  scriptUrl: '/bee.js',
  apiUrl: '/_hive',
})
const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <SWRConfig value={{ fetcher }}>
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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <DefaultSeo {...config} />
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default App
