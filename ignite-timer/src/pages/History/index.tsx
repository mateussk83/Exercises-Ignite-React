import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Duração</th>
          <th>Início</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody> 
          {cycles.map(cycle => {
            return(
            <tr key={cycle.id}>
          <td>{cycle.task}</td>
          <td>{cycle.minutesAmount} minutos</td>
          {/* ele mostra a quanto tempo ele iniciou */}
          <td>{formatDistanceToNow(new Date(cycle.startDate), {
            addSuffix: true,
            locale: ptBR,

          })}</td>
          <td>
            {/* ele só vai executar isso aqui caso o valor seja verdadeiro  */}
            { cycle.finishedDate && (<Status statusColor="green"> 
              Concluído 
              </Status>)
            }
            { cycle.interruptedDate && (<Status statusColor="red"> 
              Interrompido 
              </Status>)
            }
            {/* se ele nao tiver interrupted date e nao tiver o finished date entao vai executar isso aqui */}
            { (!cycle.finishedDate && !cycle.interruptedDate) && (<Status statusColor="yellow"> 
              Em Andamento
              </Status>)
            }
            </td>
            </tr>
            )
          })}
      </tbody>
    </table>
      </HistoryList>
    </HistoryContainer>
  )
}
