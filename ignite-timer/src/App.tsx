import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/default'

export function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
        </ThemeProvider>
  )
}

