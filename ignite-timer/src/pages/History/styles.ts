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