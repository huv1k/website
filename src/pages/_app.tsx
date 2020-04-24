import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import { SWRConfig } from 'swr'
import fetch from 'unfetch'

class Blog extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: (req: RequestInfo, init?: RequestInit) =>
              fetch(req, init).then((res) => res.json()),
          }}
        >
          <Component {...pageProps} />
          <GlobalStyles />
        </SWRConfig>
      </ThemeProvider>
    )
  }
}

export default Blog
