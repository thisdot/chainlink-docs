import styles from "./TutorialSection.module.css"
import { TutorialLink } from "./TutorialCard.tsx"
import { TutorialGrid } from "./TutorialGrid.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from "@chainlink/blocks"

export interface Tab {
  name: string
  description?: string
  links: TutorialLink[]
}

interface TutorialSectionProps {
  tabs: Tab[]
  defaultTab?: string
}

export const TutorialSection = ({ tabs }: TutorialSectionProps) => {
  return (
    <Tabs defaultValue={tabs[0].name}>
      <header className={styles.tutorialHeader}>
        <Typography variant="h2">Tutorials</Typography>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </header>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.name}>
          <div className={styles.tutorialSection}>
            <TutorialGrid links={tab.links} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
