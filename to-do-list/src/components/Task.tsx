import { Trash } from "phosphor-react";
import styles from "Task.module.css"

interface TaskProps {
  content: string;
}
export function Task({ content }: TaskProps) {


  return (
    <div className={styles.tasks}>
      <div className={styles.description}>
        <button className={styles.statusTask}>c</button>
        <span>
          {content}
        </span>
      </div>
      <button
        className={styles.deletTask}
      >
        <Trash size={24} className={styles.icon} />
      </button>
    </div>
  )
}