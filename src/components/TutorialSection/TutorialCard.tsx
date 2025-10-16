import { Typography, SvgArrowDiagonalUpperRight } from "@chainlink/blocks"
import styles from "./TutorialCard.module.css"

export interface TutorialLink {
  title: string
  description: string
  link: string
}

export const TutorialCard = ({ title, description, link }: TutorialLink) => {
  return (
    <a href={link} className={styles.card}>
      <div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <Typography variant="body-s" style={{ lineHeight: "24px" }}>
          {description}
        </Typography>
      </div>

      <div className={styles.cardFooter}>
        <SvgArrowDiagonalUpperRight />
      </div>
    </a>
  )
}
