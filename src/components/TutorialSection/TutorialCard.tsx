import styles from "./TutorialCard.module.css"

export interface TutorialLink {
  title: string
  description: string
  link: string
  type: string
}

interface TutorialCardProps extends TutorialLink {}

export const TutorialCard = ({ title, description, link, type }: TutorialCardProps) => {
  const isExternal = link.startsWith("http")

  return (
    <a
      href={link}
      className={styles.card}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={styles.typeBadge}>{type}</span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
    </a>
  )
}
