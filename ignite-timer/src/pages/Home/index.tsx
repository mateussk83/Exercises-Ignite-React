/* eslint-disable prettier/prettier */
import { Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
// o import é um pouco diferente pq precisamos colocar o /zod no final que é a biblioteca de validação que estamos utilizando
import { zodResolver } from '@hookform/resolvers/zod';
// como ela nao tem um biblioteca default entao precisamos importar exatamente oq iremos utilizar neste caso vamos importar tudo usando script modules
import * as zod from 'zod';
import { differenceInSeconds } from "date-fns";

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
  startDate: Date
}

/* Controlled vs Uncontrolled
  Controlled -> atualiza a tag a todo alteração e evento que acontece por exemplo no input quando colocamos o useState no onChange do input ele fica atualizando a tela inteira a todo momento que acontece uma alteração nele(se uma tecla e clicada ou apagada) utilizar em form simples como este
  Uncontrolled -> pega o valor somente quando ele é requisitado por exemplo quando ouver o click no button submit do form
  utilizar em form complexo pelo fato de com o controlled ele fica atualizando o component inteiro todo o tempo ja com o uncontrolled ele só vai atualizar quando houver o submit
*/
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
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
  // aqui ele diz que vai em cycles e procurar o cycle que tenho o id igual ao activeCycleId
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
  // useEffect serve para vc ficar monitorando uma variavel e toda vez que ela for alterada fazer o que esta dentro do {} dnv
  useEffect(() => {
    let interval: number;

    // se eu tiver um ciclo ativo
    if (activeCycle) {
      interval = setInterval(() => {
        // differenceInfSeconds é uma função do date-fns que permite subtrair em segundo a diferença das duas datas
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
    // o useEffect pode retornar uma função que geralmente utilizamos para limpar o próprio useEffect e essa função é ativa só na segunda vez que o useEffect é ativado
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])
  //data -> são os dados do nosso formulario  
  // NewCycleFormData -> é a interface que defini a tipagem do data
  function handleCreateNewCycle(data: NewCycleFormData) {
    // newCycle: Cycle -> define a tipagem do newCycle com o interface Cycle
    const newCycle: Cycle = {
      // ele pega o Date e do date ele pega a diferença da data atual com a data informada
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)

    // reset volta para o valor inicial que foi definido la no defaultValues
    reset()
  }
  // se active cycle estiver com algum id entao pega dentro dele o minutes amount e multiplica por 60 se nao vai ser 0
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // esta constante fala se tiver algum valor em activeCycle entao pega o total de segundos e subtrai com o tanto de segundos que ja passou se nao tive nada em active cycle entao é 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  // dentro do math temos tres utilização importante pra arredondar o floor que arredonda pra baixo o ceil que sempre arredonda pra cima e o round arredonda quando tiver mais de .5
  const minutesAmount = Math.floor(currentSeconds / 60)
  // resto da divisão de 60
  const secondsAmount = currentSeconds % 60

  // padStart preenche uma string até um padrão especifico, neste caso diz sempre a variavel de minutes vai ter 2 caracteres se nao tiver ela vai colocar 0 no começo da string até completar ela
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  // aqui diz que ele estara em disabled somente quando o task for igual a ''
  const task = watch('task')
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
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
