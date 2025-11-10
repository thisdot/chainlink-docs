import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Typography } from "@chainlink/blocks"
import styles from "./styles.module.css"

interface AccordionTab {
  title: string
  text: string
}

interface TryItOutAccordionProps {
  tabs: AccordionTab[]
}

export const TryItOutAccordion = ({ tabs }: TryItOutAccordionProps) => {

  return (
    <Accordion collapsible type="single">
      {tabs.map((tab, idx) => (
        <AccordionItem key={idx} value={String(idx)} className={styles.accordionItem}>
          <AccordionTrigger className={styles.accordionTrigger}>
            {tab.title}{" "}
            <Typography variant="code" className={styles.indicator}>
              0{idx + 1}
            </Typography>
          </AccordionTrigger>
          <AccordionContent className={styles.text}>{tab.text}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
