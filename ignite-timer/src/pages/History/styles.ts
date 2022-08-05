import styled from "styled-components"

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1{
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`

  flex:1;
  // overflow: auto; -> este comando diz que quando a lista History for maior que a triar um scroll 
  overflow: auto;
  margin-top: 2rem;

  table{
    width: 100%;
    // se eu nao colocar border collapse ele vai pegar a margin dos dois th da table porem com este comando ele vai pegar somente oq foi definida pra ele ex: se o th tem 1 px sem o border-collapse ele teria 2px o dele mais o do proximo ja com este comando ele vai ficar com apenas um 1 px
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      // aqui ele diz pra esta estilização pegar somente a primeira th 
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
    

    &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLOR  = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
// as const diz que o parametro que estamos passando pra yellow, green ou red ele é fixo sempre vai ser este yellow-500 ou green-500 ou red-500 pq se nao colocamos isso ele entende que esse yellow-500 é qualquer string um texto normal
interface StatusProps {
  // o keyof typeof STATUS_COLOR -> ta falando que só pode ser o que definimos como key do STATUS_COLOR que neste caso seria yellow, green ou red
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  // antes de qualquer conteudo
  &::before {
    // conteudo em brando
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px; 
    background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

  }

`