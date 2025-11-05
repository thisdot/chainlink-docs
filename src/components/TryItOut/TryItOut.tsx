import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Typography } from "@chainlink/blocks"
import styles from "./styles.module.css"

export default function TryItOut() {
  const tabs = [
    {
      title: "Transfer Tokens Between Chains",
      text: "Use Chainlink CCIP to transfer tokens from a smart contract to an account on a different blockchain.",
    },
    {
      title: "Leverage MVR feeds",
      text: "Use Multiple-Variable Response (MVR) feeds data in your consumer contracts on EVM chains using Solidity.",
    },
    {
      title: "Fetch and Decode Real World Asset Streams",
      text: "Use the Data Streams SDK for Go/Rust to fetch and decode reports from the Data Streams Aggregation Network.",
    },
    {
      title: "Automate your Functions",
      text: "Use Chainlink Automation to trigger the same functions regularly, such as fetching weather data daily or fetching an asset price on every block.",
    },
  ]

  return (
    <div className={styles.container}>
      <section className={styles.body}>
        <Typography variant="h2" className={styles.title}>
          Try it out
        </Typography>

        <section className={styles.content}>
          <div>
            <Accordion collapsible type="single">
              {tabs.map((tab, idx) => (
                <AccordionItem value={String(idx)} className={styles.accordionItem}>
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

            <footer className={styles.contentFooter}>
              <Button>Create CRE account</Button>
              <Button variant="tertiary" className={styles.secondaryBtn}>
                Get the SDK
              </Button>
            </footer>
          </div>

          <img src="/images/tryitout.png" alt="Try it out" className={styles.image} />
        </section>
      </section>
    </div>
  )
}
