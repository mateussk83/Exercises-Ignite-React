import { Cycle } from "./reducer";

// enum => dicionario
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}
// nomeclatura: toda vez que for uma função pra fazer uma ação especifica de um case colocar o sufixo ACTION
export function addNewCycleAction(newCycle: Cycle) {
  return {
      // type a ação que voce esta querendo fazer
      type: ActionTypes.ADD_NEW_CYCLE,
      // variavel que vai acontecer a ação
      payload: {
        newCycle,
      },   
  }
}
export function InterruptCurrentCycleAction() {
  return {
      // type a ação que voce esta querendo fazer
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE
    }
}

export function MarkCurrentCycleAsFinishedAction() {
  return {
      // type a ação que voce esta querendo fazer
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
    }
}