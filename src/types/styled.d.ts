import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string
      background: string
      detail: string
    }
    font: {
      body: string
    }
  }
}