
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
        return {
          ...state, 
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
  
        }
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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

}