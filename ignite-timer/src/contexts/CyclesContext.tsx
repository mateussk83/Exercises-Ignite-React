
import { Action } from "history";
import { createContext, ReactNode, useState, useReducer } from "react";

interface CreateCycleData {
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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null

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
  const [cyclesState, dispatch ] = useReducer((state: CyclesState, action: any) => { 

    // switch é a mesma coisa de ter varios if entao se o action.type == 'ADD_NEW_CYCLE' vai ir para o case 1 e assim por diante
    switch(action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state, 
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
  
        }
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id == state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
      }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id == state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      default:
        return state
    }

    }, {
    // no ultimo parametro do useReducer defini o valor inicial da variavel
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  // aqui ele diz que vai em cycles e procurar o cycle que tenho o id igual ao activeCycleId
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
  
  function markCurrentCycleAsFinished() {
    dispatch({
      // type a ação que voce esta querendo fazer
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      // variavel que vai acontecer a ação
      payload: {
        data: activeCycleId,
      }
    })
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
    dispatch({
      // type a ação que voce esta querendo fazer
      type: 'ADD_NEW_CYCLE',
      // variavel que vai acontecer a ação
      payload: {
        newCycle,
      }
    })
    // setCycles((state) => [...cycles, newCycle])
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      // type a ação que voce esta querendo fazer
      type: 'INTERRUPT_CURRENT_CYCLE',
      // variavel que vai acontecer a ação
      payload: {
        activeCycleId,
      }
    })
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