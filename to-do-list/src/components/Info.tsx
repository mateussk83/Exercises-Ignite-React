
import styles from './Info.module.css'

interface InfoProps {
    count: number;
}
export function Info({ count }:InfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.createCount}>
        <strong>Tarefas Criadas</strong>
        <span>{count}</span>
      </div>
      <div className={styles.completedCount}>
        <strong>Concluídas</strong>
        <span>0 de {count}</span>
      </div>
    </div>
  )
}
