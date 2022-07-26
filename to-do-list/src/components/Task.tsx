import { Trash } from "phosphor-react";
import React, { useState } from "react";
import styles from "./Task.module.css"

interface TaskProps {
  content: string;
  onDeleteTask: (task: string) => void;
  onCountCheck: (count: boolean) => void;
}
export function Task({ content, onDeleteTask, onCountCheck }: TaskProps) {

  const body = document.querySelector('body')

  function submitTask() {
    onDeleteTask(content);
  }

  function Onchecked(event: React.ChangeEvent<HTMLInputElement>) {
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
      <div className={styles.description}>
        <input type='checkbox' id="checked" onClick={Onchecked} className={styles.statusTask} />
        <span className={styles.checkmark}></span>
        <label htmlFor="checked">{content}</label>
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