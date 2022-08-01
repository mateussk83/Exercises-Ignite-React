import { createGlobalStyle } from "styled-components";
// aqui ele cria um padrão de css pra todos os components
export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #333;
  color: #fff;
}
`