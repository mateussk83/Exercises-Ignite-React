import styled from "styled-components"

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
