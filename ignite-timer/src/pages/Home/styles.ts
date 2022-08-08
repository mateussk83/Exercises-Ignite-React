import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  // este flex-wrap faz com que nao apareça a barra de rolagem na horizontal 
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`
// aqui estamos passando como parametro o BaseInput quer dizer que ele vai receber todas as propriedades de css que o base input tem
export const TaskInput = styled(BaseInput)`
  // ele vai caber no maximo espaço possivel
  flex: 1;
  //aqui é para sumir aquela seta que fica no canto do input task
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
// aqui diz que vai colocar a font roboto Mono e se nao encontrar vai colocar qualquer font mono espaçada(quer dizer que todas as letras vao ter o msm espaçamento)
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;
  span {
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

`

export const StartCountdownButton = styled.button`
  width: 100%;
  border: 0 ;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  // aqui diz se ele nao estiver disabled ele vai aplicar este hover
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`