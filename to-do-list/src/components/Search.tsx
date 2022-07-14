import styles from "./Search.module.css";

import { PlusCircle } from 'phosphor-react';

export function Search() {
  return (
    <div className={styles.search} >
      <textarea
      placeholder="Adicione uma nova tarefa"
      ></textarea>
      <button>Criar<PlusCircle size={20} color="#ffffff"  /></button>
    </div>
  )
}