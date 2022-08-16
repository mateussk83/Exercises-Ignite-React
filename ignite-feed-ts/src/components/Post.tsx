import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

// como ele só pode ter estes dois tipos entao podemos ao ives de apenas colocar string colocamos
interface Content {
  type: string;
  content: string;
}
interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}



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

// existe 3 momentos em que um componente é renderizado novamente no react.

// 1. quando o estado altera;    // montiromento de componente
// 2. quando a propriedade altera; // quando o author, publishedAt, content etc...
// 3. quando um ponente pai renderiza novamente;

// a key serve para nao precisar renderizar o codigo inteiro supondo que temos 500 posts e não dois como a aplicação é muito grande renderizar o codigo todo toda vez que tiver uma alteração entao usamos a key pra dizer pro react que ela vai alterar apenas aquele post nao todos os posts 

// em todo textarea ou imput tem uma propriedade chamada required que valida a mensagem enviada e ai podemos passar uma function como parametro no exemplo do textarea do post colocamos onInvalid={nemCommentInvalid}

// preciso criar uma interface para dizer oq é o author puplishedAt ou o content com o : a interface
export function Post({ author, publishedAt, content }: PostProps) {

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

  // dentro do typescript nao sabemos oq é event entao temos que determinar ele e passar como um parametro e existem varios tipos de evento pre-definidos no ts e usamos dependendo de qual tag esta usando neste exemplo é o form na duvida pesquisa no google tipo onchange typescript react event pra ver qual evento usar
  function CreateNewComment(event: FormEvent) {
    event.preventDefault()
    // event.target sempre retorna o elemento que esta sendo ativado no evento e se voce colocar nome da variavel e depois o value vai pegar o valor da variavel que esta no evento
    // desta forma é programação imperativa e nao declarativa const newCommentText = event.target.comment.value
    // ... copiar todos os comentarios que eu ja tenho + o novo padrao que neste caso é o comments.lenght que ve o tamanho do array + 1
    setComments([...comments, newCommentText]);

    setNewCommentText('');

  }
  // essa função é ativada toda vez que a text area é preenchida 
  // este evento como é disparado em um componente dentro do form e nao no formulario temos que colocar o tipo dele entre <> entretanto neste caso temos um evento especifico chamado Change basta usar kkk
  function newCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // precisa colocar o valor de volta pra '' pq depois que o usuario preencher os requisitos se nao colocar isso ele continua com o erro.
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function newCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    // setCustomValidity é a propriedade que mostra a validação para o usuario caso ele nao passe na validação.
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  // como era um comentario que eu queria deletar basta usar o string pq não é um evento que eu estou usando 
  function deleteComment(commentToDelete: string) {
    // imutabilidade -> as variaveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    // filters -> é uma função do javascript que diz se aquele comentario tem que continuar ou ser removido se ele returnar true permanece na lista se retornar false ele remove da lista.
    // aqui eu digo para deixar na lista appenas os comentarios que forem diferente do commentToDelete 
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return (comment !== commentToDelete)


    })
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0
  // Toda vez que for demonstrar um component list como o Comments precisa da variavel key que passa um valor unico de identificação
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
            return <p key={line.content}>{line.content}</p>
          }
          else if (line.type == 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={CreateNewComment} className={styles.commentForm}>

        <strong>deixei seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={newCommentChange}
          onInvalid={newCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>




        {comments.map(comment => {
          return (<Comment
            content={comment}
            key={comment}
            onDeleteComment={deleteComment}
          />)
        })}
      </div>
    </article>
  )
}