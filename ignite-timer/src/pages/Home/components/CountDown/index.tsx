import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";



export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed
  } = useContext(CyclesContext)
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
  // useEffect serve para vc ficar monitorando uma variavel e toda vez que ela for alterada fazer o que esta dentro do {} dnv
  // aqui estamos colocando la no title os segundos e os minutos do timer para caso quisermos entrar em outra page ainda sim conseguir ver o timer
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number;

    // se eu tiver um ciclo ativo
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          // ele transforma a string em uma data se ja for uma data ele nao vai fazer nada 
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          // differenceInfSeconds é uma função do date-fns que permite subtrair em segundo a diferença das duas datas
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    // o useEffect pode retornar uma função que geralmente utilizamos para limpar o próprio useEffect e essa função é ativa só na segunda vez que o useEffect é ativado
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed
  ])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>

  )
}