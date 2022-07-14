
import styles from './App.module.css';

import './global.css';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Tasks } from './components/Tasks';

export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
      <main>
      <Search />
      <Tasks />
      </main>
      </div>
    </div>
  )
}
