import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'

class Blog extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <Component {...pageProps} />
          <GlobalStyles />
        </>
      </ThemeProvider>
    )
  }
}

export default Blog
