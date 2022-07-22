

import { Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Task } from './Task';
import { Info } from './Info';
import styles from './Home.module.css'

export function Home() {
  const [tasks, setTasks] = useState([
    'Programar agora só bora'
  ])

  const [newTask, setNewTask] = useState('')

  function deleteTask(taskToDeleted: string) {
    const deleteTask = tasks.filter(task => {
      return (task !== taskToDeleted)
    })
  }
  function CreateNewTask(taskToAdd: string) {
    setTasks([...tasks, taskToAdd]);
    taskToAdd = ""
  }

  console.log(tasks)

  return (
    <div>
      <Task
        content=""
        onAddTask={CreateNewTask}
      />
      <Info />
      {tasks.map(task => {
        return (
          <div className={styles.tasks}>
            <div className={styles.description}>
              <button className={styles.statusTask}>c</button>
              <span>
                {task}
              </span>
            </div>
            <button
              className={styles.deletTask}
            >
              <Trash size={24} className={styles.icon} />
            </button>
          </div>
        )
      })}
    </div>
  )
}