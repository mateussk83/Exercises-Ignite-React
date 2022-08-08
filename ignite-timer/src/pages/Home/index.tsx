import { Play } from "phosphor-react";
import { useState } from "react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';

/* eslint-disable prettier/prettier */

/* Controlled vs Uncontrolled
  Controlled -> atualiza a tag a todo alteração e evento que acontece por exemplo no input quando colocamos o useState no onChange do input ele fica atualizando a tela inteira a todo momento que acontece uma alteração nele(se uma tecla e clicada ou apagada) utilizar em form simples como este
  Uncontrolled -> pega o valor somente quando ele é requisitado por exemplo quando ouver o click no button submit do form
  utilizar em form complexo pelo fato de com o controlled ele fica atualizando o component inteiro todo o tempo ja com o uncontrolled ele só vai atualizar quando houver o submit
  */
export function Home() {
  // quando utilizamos o useForm é como se estiverssemos criando um novo formulario e o const { é oq queremos estrair deste formulario }
   // register -> ele vai adicionar um input no formulario
   //
   // watch -> eu consigo com este parametro watch ficar monitorando o input que eu quiser em tempo real como o useState
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: any) {
    //data -> são os dados do nosso formulario
    console.log(data)
  }
  const task = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            // este register ele tras varios parametros para o input como onChange={} onBlur={} neste exemplo o primeiro argumento foi o ID deste input e o segundo parametro diz que vai retornar um numero
            {...register('task')}
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
            // o segundo parametro vai ser igual a true isso quer dizer que o valor retornado vai ser igual a true !
            {...register('minutesAmount' , { valueAsNumber: true })}
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
