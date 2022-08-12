
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
// como ela nao tem um biblioteca default entao precisamos importar exatamente oq iremos utilizar neste caso vamos importar tudo usando script modules
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";



// aqui é a validação do formulario neste caso como o data que recebemos la na funçaõ handleCreateNewCycle recebe um object com dois parametros a task e o minutesAmount
const newCycleFormValidationSchema = zod.object({
  // aqui falamos que a task tem que ser uma string e tem que ter no minimo é um caracter e caso nao tiver mostrar a mensagem'Informe a tarefa'
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

// sempre que queremos referenciar algo do javascript dentro do typescript utilizamos typeof 
// aqui estamos criando a interface do typescript porem utilizando zod e o objeto NewCycleFormDataValidationSchema como referencia para tipagem de task e minutesAmount se torna mesma coisa do que 
/*
interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}
*/
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)
  // quando utilizamos o useForm é como se estiverssemos criando um novo formulario e o const { é oq queremos estrair deste formulario }
  // register -> ele vai adicionar um input no formulario
  // watch -> eu consigo com este parametro watch ficar monitorando o input que eu quiser em tempo real como o useState
  // <> dentro dele colocaremos a interface que passa a tipagem
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    // useForm tbm pode configurar o valor inicial que a variavel vai ter!
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  // quando utilizamos o handle na frente da função é para usar diretamento no evento!!!
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  // aqui diz que ele estara em disabled somente quando o task for igual a ''
  const task = watch('task')
  const isSubmitDisabled = task == ''


  // o FormProvider permite enviar por ele propriedades para o NewCycleForm
  // {...newCycleForm} == register={register} handleSubmit={handleSubmit} na vdd ele ta falando pega tudo que tem em newCycleForm e envia para todos os componentes dentro do FormProvider
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">


        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />


        {activeCycle ? (
          <StopCountDownButton
            type="button"
            onClick={interruptCurrentCycle}
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
