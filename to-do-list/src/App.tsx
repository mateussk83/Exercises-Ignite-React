
import styles from './App.module.css';

import './global.css';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { Home } from './components/Home';
import { Info } from './components/Info';

export function App() {


  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
      <main>
      <Home/>
      </main>
      </div>
    </div>
  )
}
