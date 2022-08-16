import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { addNewCycleAction, InterruptCurrentCycleAction, MarkCurrentCycleAsFinishedAction } from "../reducers/cycles/action";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;

  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  // ReactNode nada mais é que qualquer html valido
  children: ReactNode
}

// createContext serve para cirar um contexto com os components filhos para nao precisar ficar passando parametro para para o countdown la no <CountDown /> podemos criar um contexto que vai receber um {} e dentro do array podemos colocar variaveis que todos os components vão poder usar aquelas variaveis !!!!!!!!!!!!!
// colocamos CyclesContextType para mostrar oq vamos passar
// mantemos no contexto somente coisas que nao vao mudar se a gente trocar a biblioteca ou algo assim
export const CyclesContext = createContext({} as CyclesContextType)


//children é na vdd todo o conteudo que passamos dentro da tag la no app tem a tag router entre o cyclesContextProvider entao temos que colocar children aqui no codigo pra mostrar onde vai ficar
export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // useReducer tem dois parametros o primeiro é uma função e o segundo é o valor inicial da variavel 
  // geralmente utilizamos o useReducer quando temos uma informação mto complexa que tem muita tratativa
  //  primeiro parametro state que vai ser o estado e a segunda vai ser uma ação como add ou reducer e etc
  // a gente coloca o nome dispach quando queremos falar que uma ação vai disparar algo
  // neste caso estamos pegando esta primeira função la do reducers cycles.ts
  // o use Reducer pode receber uma função como 3 parametro ele é disparado quando for iniciar a pagina pra pegar dados de algum outro lugar

  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      // no ultimo parametro do useReducer defini o valor inicial da variavel
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    }
  )
  const { cycles, activeCycleId } = cyclesState
  // aqui ele diz que vai em cycles e procurar o cycle que tenho o id igual ao activeCycleId
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        // ele transforma a string em uma data se ja for uma data ele nao vai fazer nada 
        new Date(activeCycle.startDate)
      )
    }
    else {
    return 0
  }
  })


  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])


  function markCurrentCycleAsFinished() {
    dispatch(MarkCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }



  

  // NewCycleFormData -> é a interface que defini a tipagem do data
  function createNewCycle(data: CreateCycleData) {
    // newCycle: Cycle -> define a tipagem do newCycle com o interface Cycle
    const newCycle: Cycle = {
      // ele pega o Date e do date ele pega a diferença da data atual com a data informada
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    dispatch(addNewCycleAction(newCycle))
    // setCycles((state) => [...cycles, newCycle])
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(InterruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {/* aqui o children */}
      {children}
    </CyclesContext.Provider>
  )
}
