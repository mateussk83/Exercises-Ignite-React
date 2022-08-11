/* eslint-disable prettier/prettier */
import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
// como ela nao tem um biblioteca default entao precisamos importar exatamente oq iremos utilizar neste caso vamos importar tudo usando script modules
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";


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
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;

  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

// createContext serve para cirar um contexto com os components filhos para nao precisar ficar passando parametro para para o countdown la no <CountDown /> podemos criar um contexto que vai receber um {} e dentro do array podemos colocar variaveis que todos os components vão poder usar aquelas variaveis !!!!!!!!!!!!!
// colocamos CyclesContextType para mostrar oq vamos passar
// mantemos no contexto somente coisas que nao vao mudar se a gente trocar a biblioteca ou algo assim
export const CyclesContext = createContext({} as CyclesContextType)

// aqui é a validação do formulario neste caso como o data que recebemos la na funçaõ handleCreateNewCycle recebe um object com dois parametros a task e o minutesAmount
const newCycleFormValidationSchema = zod.object({
  // aqui falamos que a task tem que ser uma string e tem que ter no minimo é um caracter e caso nao tiver mostrar a mensagem'Informe a tarefa'
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   // quando utilizamos o useForm é como se estiverssemos criando um novo formulario e o const { é oq queremos estrair deste formulario }
  // register -> ele vai adicionar um input no formulario
  // watch -> eu consigo com este parametro watch ficar monitorando o input que eu quiser em tempo real como o useState
  // <> dentro dele colocaremos a interface que passa a tipagem
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    // useForm tbm pode configurar o valor inicial que a variavel vai ter!
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // aqui ele diz que vai em cycles e procurar o cycle que tenho o id igual ao activeCycleId
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }


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
    setAmountSecondsPassed(0)

    // reset volta para o valor inicial que foi definido la no defaultValues
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
  // aqui diz que ele estara em disabled somente quando o task for igual a ''
  const task = watch('task')
  const isSubmitDisabled = task == ''


  // o FormProvider permite enviar por ele propriedades para o NewCycleForm
  // {...newCycleForm} == register={register} handleSubmit={handleSubmit} na vdd ele ta falando pega tudo que tem em newCycleForm e envia para todos os componentes dentro do FormProvider
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

        <CyclesContext.Provider
          value={{ 
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed 
          }}
        >
          <FormProvider {...newCycleForm}>
          <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>


        {activeCycle ? (
          <StopCountDownButton
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            disabled={isSubmitDisabled}
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}

      </form >
    </HomeContainer>
  )
}
