

import { Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { Task } from './Task';
import { Info } from './Info';
import styles from './Home.module.css'

interface taskProps {
  content: string;
}
export function Home() {
  const [tasks, setTasks] = useState([
    'Programar agora só bora'
  ])

  const [newTask, setNewTask] = useState('')

  function CreateNewTask(taskToAdd: string) {
    setTasks([...tasks, taskToAdd]);

    setNewTask('');
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
              <button>c</button>
              <span>
                {task}
              </span>
              </div>
              <Trash size={24} className={styles.icon}/>
            </div>
          )
        })}
    </div>
  )
}