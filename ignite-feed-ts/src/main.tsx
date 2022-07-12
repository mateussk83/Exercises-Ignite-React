import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
// sempre que eu quero que o typescript respeite o q eu digitei ignorando o erro basta colocar ! depois da variavel entretanto não é uma boa solução só especificamente para o caso do root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
