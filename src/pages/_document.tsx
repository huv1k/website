import * as React from 'react'
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext ) {
    const sheet = new ServerStyleSheet()
    const renderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
      renderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ) as any,
      }
    } finally {
      sheet.seal()
    }
  }
}

export default MyDocument
