import { TutorialCard, TutorialLink } from "./TutorialCard.tsx"
import styles from "./TutorialSection.module.css"

interface TutorialGridProps {
  links: TutorialLink[]
}

export const TutorialGrid = ({ links }: TutorialGridProps) => {
  return (
    <div className={styles.grid}>
      {links.map((link, index) => (
        <TutorialCard key={`${link.title}-${index}`} {...link} />
      ))}
    </div>
  )
}
