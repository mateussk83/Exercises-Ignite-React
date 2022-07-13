import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import styles from './App.module.css';

import './global.css';

interface Content {
  type: 'pharagraph' | 'link';
  content: string; 
}

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/mateussk83.png',
      name: 'Mateus Garcia',
      role: 'Web Developer'
    },
    content: [
      { type: 'pharagraph', content: 'Fala galeraa 👋' },

      { type: 'pharagraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-07-02 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/ThiagodePaulaSouza.png',
      name: 'Thiago de Paula Souza',
      role: 'Web Developer**'
    },
    content: [
      { type: 'pharagraph', content: 'Fala galeraa 👋' },

      { type: 'pharagraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'pharagraph', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-06-07 20:00:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (<Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />)
          })}
        </main>
      </div>
    </div>

  )
}