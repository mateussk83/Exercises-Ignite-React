
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
// como ela nao tem um biblioteca default entao precisamos importar exatamente oq iremos utilizar neste caso vamos importar tudo usando script modules
import * as zod from 'zod'
import { useForm } from 'react-hook-form';
// o import é um pouco diferente pq precisamos colocar o /zod no final que é a biblioteca de validação que estamos utilizando
import { zodResolver } from '@hookform/resolvers/zod';

// aqui é a validação do formulario neste caso como o data que recebemos la na funçaõ handleCreateNewCycle recebe um object com dois parametros a task e o minutesAmount
const newCycleFormValidationSchema = zod.object({
  // aqui falamos que a task tem que ser uma string e tem que ter no minimo é um caracter e caso nao tiver mostrar a mensagem'Informe a tarefa'
  task: zodResolver.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

export function NewCycleForm() {
  // quando utilizamos o useForm é como se estiverssemos criando um novo formulario e o const { é oq queremos estrair deste formulario }
  // register -> ele vai adicionar um input no formulario
  // watch -> eu consigo com este parametro watch ficar monitorando o input que eu quiser em tempo real como o useState
  // <> dentro dele colocaremos a interface que passa a tipagem
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    // useForm tbm pode configurar o valor inicial que a variavel vai ter!
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

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