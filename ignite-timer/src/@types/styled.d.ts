import 'styled-components'
import { defaultTheme } from '../themes/default'
import { defaultTheme } from '../styles/themes/default'
// isso aqui tudo serve para mostrar ao typescript no completador as opções corretas (quando apertamos crtl + space ele aparece oq pode ser colocado com isso ele vai aparecer os novos parametros criado no ThemeType)
type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
