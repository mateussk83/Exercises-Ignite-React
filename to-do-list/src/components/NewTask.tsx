import styles from './NewTask.module.css'

import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, InvalidEvent, useState } from "react";

interface TaskProps {
  onAddTask: (task: string) => void;
}
export function NewTask({ onAddTask }: TaskProps, event: ChangeEvent<HTMLTextAreaElement>) {
  const [task, setTask] = useState('');
  function submitTask() {
    if (task != '') {
      onAddTask(task);
    }
    Array.from(document.querySelectorAll("textarea")).forEach(
      input => (input.value = "")
    );
    setTask('')
  }
  function newTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatorio!');
  }

  function newTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setTask(event.target.value);
  }



  

  const isNewTaskEmpty = task.length == 0;
  return (
    <div className={styles.task}>
      <textarea
        name="task"
        placeholder="Adicione uma nova tarefa"
        onChange={newTaskChange}
        onInvalid={newTaskInvalid}
        required
      />
      <button type="submit" onClick={submitTask} disabled={isNewTaskEmpty} >Criar<PlusCircle size={20} color="#ffffff" /></button>
    </div>
  )
}