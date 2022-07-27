

import { ClipboardText, Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Info } from './Info';
import { NewTask } from './NewTask';
import styles from './Home.module.css';
import { Task } from './Task';

export function Home() {
  const [tasks, setTasks] = useState(['Programar agora só bora'
  ])
  const [onCheck, setOnCheck] = useState(0)

  const [count, setCount] = useState(1)
  function countCheck(value: boolean,) {
    if (value == true) {
      setOnCheck(onCheck + 1)
    }
    else {
      setOnCheck(onCheck - 1)
    }
  }

  

  function CreateNewTask(taskToAdd: string) {
    setTasks([...tasks, taskToAdd]);
    taskToAdd = ""
    setCount(count + 1);
  }
  function DeleteTask(taskToDelete: string) {
    const TaskWithoutDeletedOne = tasks.filter(task => {
      return (task !== taskToDelete)
    })
    setTasks(TaskWithoutDeletedOne);
  }
  return (
    <div>
      <NewTask
        onAddTask={CreateNewTask}
      />
      <Info
        count={tasks.length}
        value={onCheck}
      />
      { tasks.length == 0 
      ? 
      <div className={styles.noTask}>
        <div className={styles.icon}>
        <ClipboardText size={56} color="#3d3d3d" />
        </div>
        <div>
        <strong>Você ainda não tem tarefas cadastradas</strong> 
        </div>
        <span>Crie tarefas e organize seus items a fazer</span>
      </div>    
      : 
      <div>
      {tasks.map(taskNow => {

        return (
          <Task
            id={count}
            content={taskNow}
            onDeleteTask={DeleteTask}
            onCountCheck={countCheck}
          />
        )
      })}
      </div>
      }   

    </div>
  )
}