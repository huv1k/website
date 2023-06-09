import { ChakraProvider } from '@chakra-ui/react'
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import { config } from '../lib/seo'
import { theme } from '../lib/theme'
import '../styles/global.css'

const iaWriter = localFont({
  src: [
    {
      path: '../fonts/ia-writer-regular.woff2',
      weight: '400',
    },
    {
      path: '../fonts/ia-writer-bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-ia-writer',
})

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${iaWriter.className} ${iaWriter.variable}`}>
      <ChakraProvider
        theme={theme({
          styles: {
            global: {
              'html, body': {
                letterSpacing: '-0.01em',
              },
            },
          },
          fonts: {
            heading: iaWriter.style.fontFamily,
            body: iaWriter.style.fontFamily,
            mono: iaWriter.style.fontFamily,
          },
        })}
      >
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
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <DefaultSeo {...config} />
          <Component {...pageProps} />
          <Analytics />
        </SWRConfig>
      </ChakraProvider>
    </main>
  )
}

export default App
