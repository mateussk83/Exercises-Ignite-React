

import { Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Info } from './Info';
import { NewTask } from './NewTask';
import styles from './Home.module.css';
import { Task } from './Task';

export function Home() {
  const [tasks, setTasks] = useState([
    'Programar agora só bora'
  ])
  const [onCheck, setOnCheck] = useState(0)

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
      {tasks.map(taskNow => {
        
        return (
          <Task
            content={taskNow}
            onDeleteTask={DeleteTask}
            onCountCheck={countCheck}
          />
        )
      })}
    </div>
  )
}