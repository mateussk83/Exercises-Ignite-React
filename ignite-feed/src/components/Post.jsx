import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';






const comments = [
  1,
  2,
];
// date time serve para colocar datas especificas dentro dele datetime pra ver no navegador e o title para a pessoa ver se colocar o mouse em cima

// o {' '} serve para dar um espaço la infelizmente é a unica forma em react sem utilizar o css

// a biblioteca date-fns tem essa função chamada format que o primeiro parametro é a variavel que quer ser transformada e a segunda tem o formato que quer transformar a variavel e colocamos '' pra ele entender oq nao queremos mudar que naquele caso é o 'de' 'às' e o 'h'

// o formatDistanceToNow serve para ver a distancia de tempo da data de publicação até hoje e o addSuffix como disse vai adicionar o prefixo la 

// Para ouvir eventos no React utilizamos onSubmit porem com o S maiusculo 

// quando utilizamos event.preventDefault() é pq o padrao do submit é reiniciar a pagina com ele este padrao muda para ficar na msm pagina

// push é para adicionar um elemento em uma array 

//  estado = variaveis que eu quero que o componente monitore

// e para dizer que aquela variavel é um estado basta colocar const [ nome da variavel, e uma função que fica monitorando e fala quando o react vai agir e fala oq vai acontecer com a variavel = useState([e como a variavel esta no momento])

// onChange diz que vai executar toda vez que ele digitar algo na textarea
export function Post({ author, publishedAt, content }) {

  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ])

  // ela se inicia em vazio e a variavel nemCommentText vai ser mudada pela setNewCommentText 
  const [newCommentText, setNewCommentText] = useState('')


  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })
  function CreateNewComment() {
    event.preventDefault()
    // event.target sempre retorna o elemento que esta sendo ativado no evento e se voce colocar nome da variavel e depois o value vai pegar o valor da variavel que esta no evento
    // desta forma é programação imperativa e nao declarativa const newCommentText = event.target.comment.value
    // ... copiar todos os comentarios que eu ja tenho + o novo padrao que neste caso é o comments.lenght que ve o tamanho do array + 1
    setComments([...comments, newCommentText]);

    setNewCommentText('');

  }
  // essa função é ativada toda vez que a text area é preenchida
  function newCommentChange() {
    setNewCommentText(event.target.value);
  }



  return (
    <article className={styles.Post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormated}
          dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type == 'pharagraph') {
            return <p>{line.content}</p>
          }
          else if (line.type == 'link')
            return <p><a href="">{line.content}</a></p>
        })}
      </div>

      <form onSubmit={CreateNewComment} className={styles.commentForm}>

        <strong>deixei seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={newCommentChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>

        {comments.map(comment => {
          return <Comment content={comment} />
        })}
      </div>
    </article>
  )
}