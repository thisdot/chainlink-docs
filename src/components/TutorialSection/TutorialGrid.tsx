import styles from "./TutorialSection.module.css"
import { TutorialCard, TutorialLink } from "./TutorialCard"

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
