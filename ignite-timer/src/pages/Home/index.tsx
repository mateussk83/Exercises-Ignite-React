/* eslint-disable prettier/prettier */
import { Play } from "phosphor-react";
import { useState } from "react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
// o import é um pouco diferente pq precisamos colocar o /zod no final que é a biblioteca de validação que estamos utilizando
import { zodResolver} from '@hookform/resolvers/zod';
// como ela nao tem um biblioteca default entao precisamos importar exatamente oq iremos utilizar neste caso vamos importar tudo usando script modules
import * as zod from 'zod';

// aqui é a validação do formulario neste caso como o data que recebemos la na funçaõ handleCreateNewCycle recebe um object com dois parametros a task e o minutesAmount
const newCycleFormValidationSchema = zod.object({
  // aqui falamos que a task tem que ser uma string e tem que ter no minimo é um caracter e caso nao tiver mostrar a mensagem'Informe a tarefa'
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

// sempre que queremos referenciar algo do javascript dentro do typescript utilizamos typeof 
// aqui estamos criando a interface do typescript porem utilizando zod e o objeto NewCycleFormDataValidationSchema como referencia para tipagem de task e minutesAmount se torna mesma coisa do que 
/*
interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}
*/
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  isActive: boolean
}

/* Controlled vs Uncontrolled
  Controlled -> atualiza a tag a todo alteração e evento que acontece por exemplo no input quando colocamos o useState no onChange do input ele fica atualizando a tela inteira a todo momento que acontece uma alteração nele(se uma tecla e clicada ou apagada) utilizar em form simples como este
  Uncontrolled -> pega o valor somente quando ele é requisitado por exemplo quando ouver o click no button submit do form
  utilizar em form complexo pelo fato de com o controlled ele fica atualizando o component inteiro todo o tempo ja com o uncontrolled ele só vai atualizar quando houver o submit
*/
export function Home() {
   const [ cycles, setCycles] = useState<Cycle[]>([])
   const [ activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // quando utilizamos o useForm é como se estiverssemos criando um novo formulario e o const { é oq queremos estrair deste formulario }
   // register -> ele vai adicionar um input no formulario
   //
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
    //data -> são os dados do nosso formulario  
    // NewCycleFormData -> é a interface que defini a tipagem do data
  function handleCreateNewCycle(data: NewCycleFormData) {
    // newCycle: Cycle -> define a tipagem do newCycle com o interface Cycle
    const newCycle: Cycle = {
      // ele pega o Date e do date ele pega a diferença da data atual com a data informada
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)

    // reset volta para o valor inicial que foi definido la no defaultValues
    reset()
  }
// aqui ele diz que vai em cycles e procurar o cycle que tenho o id igual ao activeCycleId
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

  const task = watch('task')
  // aqui diz que ele estara em disabled somente quando o task for igual a ''
  const isSubmitDisabled = task == ''

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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
            // o segundo parametro vai ser igual a true isso quer dizer que o valor retornado vai ser igual a true !
            {...register('minutesAmount' , { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        
        <StartCountdownButton 
        disabled={isSubmitDisabled}
        type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
        </form >
    </HomeContainer>
  )
}
