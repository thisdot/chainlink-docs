import { SvgSearch, SvgTaillessArrowDownSmall, SvgX } from "@chainlink/blocks"
import styles from "./styles.module.css"
import { useState, useEffect, useCallback } from "react"
import { clsx } from "~/lib/clsx/clsx.ts"
import type { ChangelogItem } from "~/components/ChangelogSnippet/types"
import { matchesFilters } from "~/utils/changelogFilters"

type FilterType = "product" | "network" | "type" | null

interface SearchInputProps {
  isExpanded: boolean
  onClick: (value: boolean) => void
  value: string
  onChange: (value: string) => void
}

const SearchInput = ({ isExpanded, onClick, value, onChange }: SearchInputProps) => {
  return (
    <div className={clsx(styles.searchInputWrapper, isExpanded && styles.expanded)} onClick={() => onClick(true)}>
      <SvgSearch className={styles.searchIcon} color="pill-active" />
      <input
        placeholder={!isExpanded ? "Search" : "Search a product, network or type"}
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isExpanded && (
        <SvgX
          color="pill-active"
          onClick={(e) => {
            e.stopPropagation()
            onClick(false)
            onChange("")
          }}
          style={{
            marginRight: "var(--space-4x)",
          }}
        />
      )}
    </div>
  )
}

interface TriggerProps {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
}

const Trigger = ({ label, count, isActive, onClick }: TriggerProps) => {
  return (
    <button className={clsx(styles.btn, isActive && styles.btnActive)} onClick={onClick}>
      <div>
        {label}
        {count > 0 && (
          <span>
            {count} <SvgX height={10} width={10} color="input-muted-more" />{" "}
          </span>
        )}
      </div>{" "}
      <SvgTaillessArrowDownSmall color="pill-active" />
    </button>
  )
}

interface FilterPillProps {
  label: string
  isSelected: boolean
  onClick: () => void
}

const FilterPill = ({ label, isSelected, onClick }: FilterPillProps) => {
  return (
    <button className={clsx(styles.pill, isSelected && styles.pillSelected)} onClick={onClick}>
      {label}
      {isSelected && (
        <span>
          <SvgX color="pill-active" width={12} height={12} />
        </span>
      )}
    </button>
  )
}

export interface ChangelogFiltersProps {
  products: string[]
  networks: string[]
  types: string[]
  items: ChangelogItem[]
}

export const ChangelogFilters = ({ products, networks, types, items }: ChangelogFiltersProps) => {
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Read URL parameters on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const productParam = params.get("product")
    const networkParam = params.get("network")
    const typeParam = params.get("type")
    const searchParam = params.get("*")

    if (productParam) {
      setSelectedProducts(productParam.split(","))
    }
    if (networkParam) {
      setSelectedNetworks(networkParam.split(","))
    }
    if (typeParam) {
      setSelectedTypes(typeParam.split(","))
    }
    if (searchParam) {
      setSearchTerm(searchParam)
      setSearchExpanded(true)
    }
  }, [])

  // Update URL whenever filters change
  const updateURL = useCallback((products: string[], networks: string[], types: string[], search: string) => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams()

    if (search) {
      params.set("*", search)
    } else {
      if (products.length > 0) {
        params.set("product", products.join(","))
      }
      if (networks.length > 0) {
        params.set("network", networks.join(","))
      }
      if (types.length > 0) {
        params.set("type", types.join(","))
      }
    }

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.replaceState({}, "", newURL)
  }, [])

  // Update URL when filters change
  useEffect(() => {
    updateURL(selectedProducts, selectedNetworks, selectedTypes, searchTerm)
  }, [selectedProducts, selectedNetworks, selectedTypes, searchTerm, updateURL])

  // Filter items and update the display
  useEffect(() => {
    if (typeof window === "undefined") return

    const changelogItems = document.querySelectorAll(".changelog-item")
    const loadMoreSection = document.querySelector(".load-more-section") as HTMLElement
    const visibleCountSpan = document.getElementById("visible-count")

    if (searchTerm) {
      // Search takes priority - filter by search term
      const searchLower = searchTerm.toLowerCase()
      let visibleCount = 0

      changelogItems.forEach((item) => {
        const index = parseInt(item.getAttribute("data-index") || "0")
        const changelogItem = items[index]

        const matchesSearch =
          changelogItem?.name.toLowerCase().includes(searchLower) ||
          changelogItem?.["text-description"]?.toLowerCase().includes(searchLower)

        if (matchesSearch) {
          ;(item as HTMLElement).style.display = ""
          visibleCount++
        } else {
          ;(item as HTMLElement).style.display = "none"
        }
      })

      // Hide load more section when searching
      if (loadMoreSection) {
        loadMoreSection.style.display = "none"
      }
    } else {
      // Apply filter logic
      let visibleCount = 0
      const hasFilters = selectedProducts.length > 0 || selectedNetworks.length > 0 || selectedTypes.length > 0

      changelogItems.forEach((item) => {
        const index = parseInt(item.getAttribute("data-index") || "0")
        const changelogItem = items[index]

        if (hasFilters && changelogItem) {
          const matches = matchesFilters(changelogItem, selectedProducts, selectedNetworks, selectedTypes)
          if (matches) {
            ;(item as HTMLElement).style.display = ""
            visibleCount++
          } else {
            ;(item as HTMLElement).style.display = "none"
          }
        } else {
          // No filters - show first 25 items by default
          if (visibleCount < 25) {
            ;(item as HTMLElement).style.display = ""
            visibleCount++
          } else {
            ;(item as HTMLElement).style.display = "none"
          }
        }
      })

      // Show/hide load more section based on filters
      if (loadMoreSection) {
        if (hasFilters) {
          loadMoreSection.style.display = "none"
        } else {
          loadMoreSection.style.display = visibleCount >= items.length ? "none" : "flex"
        }
      }

      // Update visible count
      if (visibleCountSpan) {
        visibleCountSpan.textContent = visibleCount.toString()
      }
    }
  }, [searchTerm, selectedProducts, selectedNetworks, selectedTypes, items])

  const searchClickHandler = (value: boolean) => {
    setSearchExpanded(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const toggleFilter = (filterType: FilterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType)
  }

  const toggleSelection = (type: "product" | "network" | "type", value: string) => {
    switch (type) {
      case "product":
        setSelectedProducts((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]))
        break
      case "network":
        setSelectedNetworks((prev) => (prev.includes(value) ? prev.filter((n) => n !== value) : [...prev, value]))
        break
      case "type":
        setSelectedTypes((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))
        break
    }
  }

  const getFilterOptions = () => {
    switch (activeFilter) {
      case "product":
        return products
      case "network":
        return networks
      case "type":
        return types
      default:
        return []
    }
  }

  const getSelectedValues = () => {
    switch (activeFilter) {
      case "product":
        return selectedProducts
      case "network":
        return selectedNetworks
      case "type":
        return selectedTypes
      default:
        return []
    }
  }

  return (
    <div className={styles.wrapper}>
      {activeFilter && (
        <div className={styles.expandedContent}>
          {getFilterOptions().map((option) => (
            <FilterPill
              key={option}
              label={option}
              isSelected={getSelectedValues().includes(option)}
              onClick={() => toggleSelection(activeFilter, option)}
            />
          ))}
        </div>
      )}
      <div className={styles.content}>
        {!searchExpanded && (
          <>
            <Trigger
              label="Product"
              count={selectedProducts.length}
              isActive={activeFilter === "product"}
              onClick={() => toggleFilter("product")}
            />
            <Trigger
              label="Network"
              count={selectedNetworks.length}
              isActive={activeFilter === "network"}
              onClick={() => toggleFilter("network")}
            />
            <Trigger
              label="Type"
              count={selectedTypes.length}
              isActive={activeFilter === "type"}
              onClick={() => toggleFilter("type")}
            />
          </>
        )}
        <SearchInput
          isExpanded={searchExpanded}
          onClick={searchClickHandler}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}
