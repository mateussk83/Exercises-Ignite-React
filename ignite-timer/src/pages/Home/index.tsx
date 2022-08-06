import { Play } from "phosphor-react";
import { useState } from "react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

/* eslint-disable prettier/prettier */
export function Home() {
  const[task, setTask] = useState('');

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            // controled component é conseguir ver o que esta acontecendo no component em tempo real e uma boa pratica este value={task} pq atualiza o valor a toda alteração e mostra para o usuario
            onChange={(e) => setTask(e.target.value)}
            value={task}
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
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        
        <StartCountdownButton 
        // aqui diz que ele estara em disabled somente quando o task for igual a ''
        disabled={task == ''} 
        type="submit"
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
        </form >
    </HomeContainer>
  )
}
