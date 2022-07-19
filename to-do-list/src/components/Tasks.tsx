

import { Trash } from 'phosphor-react'
import styles from './Tasks.module.css'

export function Tasks() {
  return (
    <div className={styles.tasks}>
      <button>c</button>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolore autem quo ducimus repellat dolor, error odit eligendi sequi voluptate perferendis.
      </span>
      <Trash size={40} />

    </div>
  )
}