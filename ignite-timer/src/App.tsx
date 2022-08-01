import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './global'
import { defaultTheme } from './themes/default'

// Global Style é os css que foram criados la no global.ts
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      asdasd
      <GlobalStyle />
    </ThemeProvider>
  )
}

