import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react';
import { Avatar } from './Avatar'
import styles from './Comment.module.css'


export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);


  // unica forma de um component se comunicar com outro é atraves das propriedades!!!!

  // podemos passar funções através das propriedades nao apenas string ou tipos de escrito como int boolean e etc...
  function clickDeleteComment() {
    onDeleteComment(content);
  }

  function likeComment() {
    setLikeCount(state => {
      return state + 1
    });
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/mateussk83.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Mateus Garcia</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Publicado de 1h atrás</time>
            </div>

            <button onClick={clickDeleteComment} title="Deletar Comentário">
              <Trash size={24} />
            </button>

          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={likeComment}>

            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}