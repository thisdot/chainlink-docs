import { Typography } from "@chainlink/blocks"
import styles from "./GridCard.module.css"

export interface GridItem {
  title: string
  description: string
  link: string
  columns?: number
  index?: number
}

export const GridCard = ({ title, description, link, columns = 3, index = 0 }: GridItem) => {
  // Calculate position in grid
  const row = Math.floor(index / columns)
  const col = index % columns
  const isFirstRow = row === 0
  const isFirstColumn = col === 0

  // Dynamic border styles
  const borderStyle: React.CSSProperties = {
    borderTop: isFirstRow ? "1px solid var(--border)" : undefined,
    borderLeft: isFirstColumn ? "1px solid var(--border)" : undefined,
    borderRight: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)",
  }

  return (
    <a href={link} className={styles.card} style={borderStyle}>
      <div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <Typography variant="body-s" style={{ lineHeight: "24px" }}>
          {description}
        </Typography>
      </div>

      <div className={styles.cardFooter}>
        <img src="/assets/icons/upper-right-arrow.svg" alt="arrow" />
      </div>
    </a>
  )
}
