import styles from './NewTask.module.css'

import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, useState } from "react";

interface TaskProps {
  onAddTask: (task: string) => void;
}
export function NewTask({ onAddTask }: TaskProps) {
  const [task, setTask] = useState('');
  function submitTask() {
    onAddTask(task);
  }

  function newTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTask(event.target.value);
  }
  return (
    <div className={styles.task}>
      <textarea
        name="task"
        placeholder="Adicione uma nova tarefa"
        onChange={newTaskChange}
      ></textarea>
      <button onClick={submitTask}>Criar<PlusCircle size={20} color="#ffffff" /></button>
    </div>
  )
}