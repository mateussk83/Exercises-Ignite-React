import { Trash } from "phosphor-react";
import React, { useState } from "react";
import styles from "./Task.module.css"

interface TaskProps {
  content: string;
  onDeleteTask: (task: string) => void;
  onCountCheck: (count: boolean) => void;
  id: number;
}
export function Task({ content, onDeleteTask, onCountCheck, id }: TaskProps) {
  const [idTask] = useState(id)
  const [task] = useState(content)
  function submitTask() {
    onDeleteTask(content);
  }
  function Onchecked(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.checked;
    if (value == true) {
      onCountCheck(value);
    }
    else {
      onCountCheck(false);
    }

  }

  return (
    <div className={styles.tasks}>
      <div className={styles.description}  >
        <input type='checkbox' id={idTask.toString()} onChange={Onchecked} className={styles.statusTask} />
        <span className={styles.checkmark}></span>
        <label htmlFor={idTask.toString()}>{task}</label>
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