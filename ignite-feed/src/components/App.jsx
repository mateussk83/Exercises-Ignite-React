import { Header } from './Header';
import { Post } from './Post';

import styles from './App.module.css'

import './global.css';

function App() {

  return ( 
    <div>
      <Header />

      <div className={styles.wrapper}>
      <aside>
    Sidebar
      </aside>
      <main>
        <Post 
        author="Diego Fernandes" 
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, accusamus similique modi animi expedita nulla, quasi unde saepe exercitationem ut necessitatibus repudiandae, molestias eligendi nisi repellat porro impedit facere. Necessitatibus?"
      />
      <Post 
        author="Leonardo Dias"
        content="post post"
      />
      </main>
      </div>
     </div>

  )
}

export default App