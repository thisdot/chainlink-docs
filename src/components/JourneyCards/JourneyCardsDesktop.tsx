import { useState, useMemo } from "react"
import { SimpleSelect, Typography, Tag } from "@chainlink/blocks"
import styles from "./JourneyCardsDesktop.module.css"

export interface JourneyItem {
  title: string
  description: string
  badge: string
  href: string
}

export interface JourneyColumn {
  title: string
  items: JourneyItem[]
}

interface JourneyCardsDesktopProps {
  columns: JourneyColumn[]
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

export const JourneyCardsDesktop = ({ columns }: JourneyCardsDesktopProps) => {
  const [selectedFilter, setSelectedFilter] = useState<ProductFilterValue>("all")

  // Filter columns based on selected product
  const filteredColumns = useMemo(() => {
    if (selectedFilter === "all") {
      return columns
    }

    return columns
      .map((column) => ({
        ...column,
        items: column.items.filter((item) => {
          // Validate badge value
          if (!validateBadge(item.badge)) {
            console.warn(`Invalid badge value: ${item.badge}`)
            return false
          }
          return item.badge.toLowerCase() === selectedFilter.toLowerCase()
        }),
      }))
      .filter((column) => column.items.length > 0) // Hide columns with no matching cards
  }, [columns, selectedFilter])

  const handleFilterChange = (value: string) => {
    // Validate filter value
    if (!PRODUCT_FILTERS.some((f) => f.value === value)) {
      console.error(`Invalid filter value: ${value}`)
      return
    }
    setSelectedFilter(value as ProductFilterValue)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.sectionTitle}>
          Start your Chainlink journey
        </Typography>
        <div className={styles.filterWrapper}>
          <SimpleSelect
            options={PRODUCT_FILTERS}
            value={selectedFilter}
            onValueChange={handleFilterChange}
            placeholder="Filter by product"
            className={styles.filterSelect}
            size="default"
          />
        </div>
      </div>

      <div className={styles.journeyCards}>
        {filteredColumns.map((column) => (
          <div key={column.title} className={styles.journeyColumn}>
            <header className={styles.columnHeader}>
              <Typography variant="h5" className={styles.columnTitle}>
                {column.title}
              </Typography>
            </header>
            {column.items.map((item) => (
              <a key={item.title} href={item.href} className={styles.journeyCard}>
                <div className={styles.cardContent}>
                  <Typography variant="body-semi">{item.title}</Typography>
                  <Typography variant="body-s" color="muted">
                    {item.description}
                  </Typography>
                </div>

                <footer className={styles.journeyFooter}>
                  <Tag size="sm" className={styles.footerTag}>
                    <Typography variant="code-s">{item.badge}</Typography>
                  </Tag>
                  <img src="/assets/icons/upper-right-arrow.svg" className={styles.footerIcon} alt="" />
                </footer>
              </a>
            ))}
          </div>
        ))}
      </div>

      {filteredColumns.length === 0 && (
        <div className={styles.noResults}>
          <Typography variant="body" color="muted">
            No journey cards match the selected filter.
          </Typography>
        </div>
      )}
    </div>
  )
}
