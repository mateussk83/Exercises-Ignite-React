import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import styles from './App.module.css';

import './global.css';


// forEach -> percorre o array porem nao tem return ja o map retorna algo quando ele percorre o array oq ele encontrou 
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
  // o react precisa que declaramos uma variave chamada pra key pra todo component que envia uma lista de interação que fala pra o react qual é a informação que vai torna-la unica neste caso o id cada post tem um determinado id
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