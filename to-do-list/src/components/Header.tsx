import styles from './Header.module.css'

import logoTodo from '../assets/logo.svg'
import nameTodo from '../assets/todo.svg'

export function Header() {

  return (
    <header className={styles.header}>
      <img src={logoTodo} alt="" />
      <img src={nameTodo} alt="" />
    </header>
  )
}

