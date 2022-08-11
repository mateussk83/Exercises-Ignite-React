/* eslint-disable prettier/prettier */
import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";


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
  markCurrentCycleAsFinished: () => void;

}

// createContext serve para cirar um contexto com os components filhos para nao precisar ficar passando parametro para para o countdown la no <CountDown /> podemos criar um contexto que vai receber um {} e dentro do array podemos colocar variaveis que todos os components vão poder usar aquelas variaveis !!!!!!!!!!!!!
// colocamos CyclesContextType para mostrar oq vamos passar
export const CyclesContext = createContext({} as CyclesContextType)

/* Controlled vs Uncontrolled
  Controlled -> atualiza a tag a todo alteração e evento que acontece por exemplo no input quando colocamos o useState no onChange do input ele fica atualizando a tela inteira a todo momento que acontece uma alteração nele(se uma tecla e clicada ou apagada) utilizar em form simples como este
  Uncontrolled -> pega o valor somente quando ele é requisitado por exemplo quando ouver o click no button submit do form
  utilizar em form complexo pelo fato de com o controlled ele fica atualizando o component inteiro todo o tempo ja com o uncontrolled ele só vai atualizar quando houver o submit
*/
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <NewCycleForm />
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
