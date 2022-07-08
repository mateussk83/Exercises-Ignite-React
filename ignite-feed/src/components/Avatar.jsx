import styles from './Avatar.module.css'

// desestruturação é quando temos um array de dados e apenas pegamos uma parte deste array 
// inves de pegar o props e colocar props.hasBorder podemos simplismente colocar dentro de {} e colocar apenas hasBorder
// e podemos definir valores default que é quando nao recebeu nenhum valor neste caso quando ela nao tiver valor vai se tornar true
export function Avatar({ hasBorder = true, src }) {

  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
    src={src} 
    />
  )
}