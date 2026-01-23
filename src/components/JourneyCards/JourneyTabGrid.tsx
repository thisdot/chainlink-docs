import { useState, useMemo } from "react"
import styles from "./JourneyTabGrid.module.css"
import { Tabs, TabsContent, TabsList, TabsTrigger, Typography, Tag, SimpleSelect } from "@chainlink/blocks"

export interface JourneyItem {
  title: string
  description: string
  link: string
  badge?: string
}

export interface JourneyTab {
  name: string
  items: JourneyItem[]
}

interface JourneyTabGridProps {
  tabs: JourneyTab[]
  header: string
}

// Product filter options
const PRODUCT_FILTERS = [
  { label: "All Products", value: "all" },
  { label: "Automation", value: "automation" },
  { label: "CCIP", value: "ccip" },
  { label: "CRE", value: "cre" },
  { label: "DataLink", value: "datalink" },
  { label: "Data Feeds", value: "data feeds" },
  { label: "Data Streams", value: "data streams" },
  { label: "DTA", value: "dta" },
  { label: "Functions", value: "functions" },
  { label: "VRF", value: "vrf" },
]

type ProductFilterValue = (typeof PRODUCT_FILTERS)[number]["value"]

// Validate badge values against expected product types
const VALID_BADGE_VALUES = new Set([
  "automation",
  "ccip",
  "cre",
  "datalink",
  "data feeds",
  "data streams",
  "dta",
  "functions",
  "vrf",
])

function validateBadge(badge: string): boolean {
  return VALID_BADGE_VALUES.has(badge)
}

export const JourneyTabGrid = ({ tabs, header }: JourneyTabGridProps) => {
  const [selectedFilter, setSelectedFilter] = useState<ProductFilterValue>("all")

  // Filter tabs based on selected product
  const filteredTabs = useMemo(() => {
    if (selectedFilter === "all") {
      return tabs
    }

    return tabs
      .map((tab) => ({
        ...tab,
        items: tab.items.filter((item) => {
          if (!item.badge) return false
          // Validate badge value
          if (!validateBadge(item.badge)) {
            console.warn(`Invalid badge value: ${item.badge}`)
            return false
          }
          return item.badge.toLowerCase() === selectedFilter.toLowerCase()
        }),
      }))
      .filter((tab) => tab.items.length > 0) // Hide tabs with no matching items
  }, [tabs, selectedFilter])

  const handleFilterChange = (value: string) => {
    // Validate filter value
    const isValid = PRODUCT_FILTERS.some((f) => f.value === value)
    if (!isValid) {
      console.error(`Invalid filter value: ${value}`)
      return
    }
    setSelectedFilter(value as ProductFilterValue)
  }

  return (
    <Tabs defaultValue={filteredTabs[0]?.name} className={styles.tabGridWrapper}>
      <header className={styles.gridHeader}>
        <Typography
          variant="h2"
          style={{
            fontSize: "32px",
          }}
        >
          {header}
        </Typography>
        <div style={{ marginTop: "var(--space-4x)", width: "100%" }}>
          <SimpleSelect
            options={PRODUCT_FILTERS}
            value={selectedFilter}
            onValueChange={handleFilterChange}
            placeholder="Filter by product"
            size="default"
          />
        </div>
        {filteredTabs.length > 0 && (
          <TabsList className={styles.tabsList}>
            {filteredTabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name} className={styles.tabsTrigger}>
                <h3 className={styles.tabTitle}>{tab.name}</h3>
              </TabsTrigger>
            ))}
          </TabsList>
        )}
      </header>

      {filteredTabs.length > 0 ? (
        filteredTabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name}>
            <div className={styles.gridContent}>
              <div className={styles.journeyGrid}>
                {tab.items.map((item, index) => (
                  <a key={`${item.title}-${index}`} href={item.link} className={styles.journeyCard}>
                    <div className={styles.cardContent}>
                      <Typography variant="body-semi">{item.title}</Typography>
                      <Typography variant="body-s" color="muted">
                        {item.description}
                      </Typography>
                    </div>

                    <footer className={styles.journeyFooter}>
                      {item.badge && (
                        <Tag size="sm" className={styles.footerTag}>
                          <Typography variant="code-s">{item.badge}</Typography>
                        </Tag>
                      )}
                      <img src="/assets/icons/upper-right-arrow.svg" className={styles.footerIcon} alt="" />
                    </footer>
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>
        ))
      ) : (
        <div style={{ padding: "var(--space-10x)", textAlign: "center" }}>
          <Typography variant="body" color="muted">
            No journey cards match the selected filter.
          </Typography>
        </div>
      )}
    </Tabs>
  )
}
