import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

// caso eu queira passar um parametro porem ele ser opcional entao temos que colocar o ? na frente do nome e o component que vai utilizar
// para nao precisar colocar em cada propriedade possivel dentro da interface em propriedades da função e etc o react tem uma função que chamam de extensões do react que coloca todas as possiveis interações com a imagem ai vc deixa apenas oq nao é padrão que neste caso é o hasBorder e ainda assim buscar o src e o alt dentro da aplicação 
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  hasBorder?: boolean;
}
// desestruturação é quando temos um array de dados e apenas pegamos uma parte deste array 
// inves de pegar o props e colocar props.hasBorder podemos simplismente colocar dentro de {} e colocar apenas hasBorder
// e podemos definir valores default que é quando nao recebeu nenhum valor neste caso quando ela nao tiver valor vai se tornar true

// existe algo no react chamado rest operator(...) que separa oq esta sendo passado assim passando tanto o alt como src juntos
export function Avatar({ hasBorder = true, ...props }: AvatarProps) {

  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
    {...props}
    />
  )
}