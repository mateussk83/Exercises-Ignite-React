
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  
  const { activeCycle} = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            // desabilitar caso tenho um activeCycle e os !! serve para falar se tiver algum valor dentro vai ser true se nao vai ser false
            disabled={!!activeCycle}
            // este register ele tras varios parametros para o input como onChange={} onBlur={} neste exemplo o primeiro argumento foi o ID deste input e o segundo parametro diz que vai retornar um numero
            {...register('task')}
          />

          <datalist id="task-suggestions"
          // este elemento diz que vai criar uma lista e em baixo as opções da lista e colocando no input como list vai aparecer como uma lista de sugestões!!!!!
          >
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            // ele pula de 5 em 5 agora
            step={5}
            // minimo de 5
            min={5}
            // maximo de 60
            max={60}
            disabled={!!activeCycle}
            // o segundo parametro vai ser igual a true isso quer dizer que o valor retornado vai ser igual a true !
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
  )
}