
import styles from './Info.module.css'

interface InfoProps {
    count: number;
    value: number;
}
export function Info({ count, value }:InfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.createCount}>
        <strong>Tarefas Criadas</strong>
        <span>{count}</span>
      </div>
      <div className={styles.completedCount}>
        <strong>Concluídas</strong>
        <span>{value} de {count}</span>
      </div>
    </div>
  )
}
