import styles from "./TabGrid.module.css"
import { GridItem } from "./GridCard.tsx"
import { ItemGrid } from "./ItemGrid.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from "@chainlink/blocks"

export interface Tab {
  name: string
  links: GridItem[]
}

interface TabGridProps {
  tabs: Tab[]
  header: string
  columns?: number
}

export const TabGrid = ({ tabs, header, columns }: TabGridProps) => {
  return (
    <Tabs defaultValue={tabs[0].name}>
      <header className={styles.tutorialHeader}>
        <Typography variant="h2">{header}</Typography>
        <TabsList className={styles.tabsList}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name} className={styles.tabsTrigger}>
              <Typography variant="body-s">{tab.name}</Typography>
            </TabsTrigger>
          ))}
        </TabsList>
      </header>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.name}>
          <div className={styles.tutorialSection}>
            <ItemGrid links={tab.links} columns={columns} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
