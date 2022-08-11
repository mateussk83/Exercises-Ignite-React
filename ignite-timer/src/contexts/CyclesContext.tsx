
import { createContext, useState } from "react";

interface CreateCycleDate {
  task: string;
  minutesAmount: number;
}

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
  createNewCycle: () => void;
}


// createContext serve para cirar um contexto com os components filhos para nao precisar ficar passando parametro para para o countdown la no <CountDown /> podemos criar um contexto que vai receber um {} e dentro do array podemos colocar variaveis que todos os components vão poder usar aquelas variaveis !!!!!!!!!!!!!
// colocamos CyclesContextType para mostrar oq vamos passar
// mantemos no contexto somente coisas que nao vao mudar se a gente trocar a biblioteca ou algo assim
export const CyclesContext = createContext({} as CyclesContextType)



export function CyclesContextProvider() {
  
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
  function createNewCycle(data: NewCycleFormData) {
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

  function interruptCurrentCycle() {
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

  return (
    <CyclesContext.Provider
          value={{ 
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed 
          }}
        ></CyclesContext.Provider>
  )
}