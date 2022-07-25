import { Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./Task.module.css"

interface TaskProps {
  content: string;
  onDeleteTask: (task: string) => void;
}
export function Task({ content, onDeleteTask }: TaskProps) {
  const [task, setTask] = useState('');
  function submitTask() {
    onDeleteTask(content);
  }


  return (
    <div className={styles.tasks}>
      <div>
        <label htmlFor="checked" className={styles.description}>{content}
          <input type='checkbox' id="checked" className={styles.statusTask} />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <button
        className={styles.deletTask}
        onClick={submitTask}
      >
        <Trash size={24} className={styles.icon} />
      </button>
    </div>
  )
}