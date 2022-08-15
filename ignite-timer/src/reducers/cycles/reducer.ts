import { produce } from 'immer'
import { ActionTypes } from "./action"

export interface Cycle {
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

export function cyclesReducer(state: CyclesState, action: any) {
  
    // switch é a mesma coisa de ter varios if entao se o action.type == 'ADD_NEW_CYCLE' vai ir para o case 1 e assim por diante
    switch(action.type) {
      case ActionTypes.ADD_NEW_CYCLE: 
        // o primeiro parametro é a variavel que queremos mudar e o segundo passamos draft que é um rascunho do que vai acontecer com a variavel este draft tbm tem todos os valores do primeiro parametro
        return produce(state, draft => {
          // push adiciona um ou mais elementos ao final do array e retorna o novo comprimento do mesmo
          draft.cycles.push(action.payload.newCycle)
          draft.activeCycleId = action.payload.newCycle.id
        })

      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
        // findIndex serve para buscar o indice que esta aquela informação
        const currentCycleIndex = state.cycles.findIndex(cycle => {
          return cycle.id == state.activeCycleId
        })  
        // se o findIndex nao encontrar um valor que corresponda com a condição ele retorna o -1
        if (currentCycleIndex < 0) {
          return state
        }
      return produce(state, draft => {
          draft.cycles[currentCycleIndex].interruptedDate = new Date() 
          draft.activeCycleId = null
        })




      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        // findIndex serve para buscar o indice que esta aquela informação
        const cycleIndex = state.cycles.findIndex(cycle => {
          return cycle.id == state.activeCycleId
        })  
        // se o findIndex nao encontrar um valor que corresponda com a condição ele retorna o -1
        if (cycleIndex < 0) {
          return state
        }
      return produce(state, draft => {
          draft.cycles[cycleIndex].finishedDate = new Date() 
          draft.activeCycleId = null
        })



      default:
        return state
    }

}