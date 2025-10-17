import { GridCard, GridItem } from "./GridCard.tsx"
import styles from "./TabGrid.module.css"

interface ItemGridProps {
  links: GridItem[]
  columns?: number
}

export const ItemGrid = ({ links, columns = 3 }: ItemGridProps) => {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {links.map((link, index) => (
        <GridCard key={`${link.title}-${index}`} {...link} columns={columns} index={index} />
      ))}
    </div>
  )
}
