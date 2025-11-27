import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import type { ChangelogItem } from "~/components/ChangelogSnippet/types"
import { matchesFilters } from "~/utils/changelogFilters"
import { parseURLParams, updateFilterURL, toggleItemInArray } from "~/utils/changelogFilterUtils"
import { DesktopFilters } from "./DesktopFilters"
import { MobileFilters } from "./MobileFilters"

export interface ChangelogFiltersProps {
  products: string[]
  networks: string[]
  types: string[]
  items: ChangelogItem[]
}

export const ChangelogFilters = ({ products, networks, types, items }: ChangelogFiltersProps) => {
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Read URL parameters on mount
  useEffect(() => {
    const urlParams = parseURLParams()

    setSelectedProducts(urlParams.products)
    setSelectedNetworks(urlParams.networks)
    setSelectedTypes(urlParams.types)
    setSearchTerm(urlParams.searchTerm)
    setSearchExpanded(urlParams.searchExpanded)
  }, [])


  // Update URL when filters change
  useEffect(() => {
    updateFilterURL(selectedProducts, selectedNetworks, selectedTypes, searchTerm)
  }, [selectedProducts, selectedNetworks, selectedTypes, searchTerm])

  // Filter items and update the display
  useEffect(() => {
    if (typeof window === "undefined") return

    const changelogItems = document.querySelectorAll(".changelog-item")
    const loadMoreSection = document.querySelector(".load-more-section") as HTMLElement
    const visibleCountSpan = document.getElementById("visible-count")
    const emptyState = document.querySelector(".empty-state") as HTMLElement
    const changelogList = document.querySelector(".changelog-list") as HTMLElement

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

      // Show/hide empty state
      if (emptyState && changelogList) {
        if (visibleCount === 0) {
          emptyState.style.display = "flex"
          changelogList.style.display = "none"
        } else {
          emptyState.style.display = "none"
          changelogList.style.display = "flex"
        }
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

      // Show/hide empty state
      if (emptyState && changelogList) {
        if (hasFilters && visibleCount === 0) {
          emptyState.style.display = "flex"
          changelogList.style.display = "none"
        } else {
          emptyState.style.display = "none"
          changelogList.style.display = "flex"
        }
      }
    }
  }, [searchTerm, selectedProducts, selectedNetworks, selectedTypes, items])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSearchToggle = (expanded: boolean) => {
    setSearchExpanded(expanded)
  }

  const toggleSelection = (type: "product" | "network" | "type", value: string) => {
    switch (type) {
      case "product":
        setSelectedProducts((prev) => toggleItemInArray(prev, value))
        break
      case "network":
        setSelectedNetworks((prev) => toggleItemInArray(prev, value))
        break
      case "type":
        setSelectedTypes((prev) => toggleItemInArray(prev, value))
        break
    }
  }

  const clearProductFilters = () => {
    setSelectedProducts([])
  }

  const clearNetworkFilters = () => {
    setSelectedNetworks([])
  }

  const clearTypeFilters = () => {
    setSelectedTypes([])
  }

  const clearAllFilters = () => {
    setSelectedProducts([])
    setSelectedNetworks([])
    setSelectedTypes([])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.desktopFilters}>
        <DesktopFilters
          products={products}
          networks={networks}
          types={types}
          selectedProducts={selectedProducts}
          selectedNetworks={selectedNetworks}
          selectedTypes={selectedTypes}
          onToggleSelection={toggleSelection}
          onClearProducts={clearProductFilters}
          onClearNetworks={clearNetworkFilters}
          onClearTypes={clearTypeFilters}
          searchTerm={searchTerm}
          searchExpanded={searchExpanded}
          onSearchChange={handleSearchChange}
          onSearchToggle={handleSearchToggle}
        />
      </div>
      <div className={styles.mobileFilters}>
        <MobileFilters
          products={products}
          networks={networks}
          types={types}
          selectedProducts={selectedProducts}
          selectedNetworks={selectedNetworks}
          selectedTypes={selectedTypes}
          onToggleSelection={toggleSelection}
          onClearProducts={clearProductFilters}
          onClearNetworks={clearNetworkFilters}
          onClearTypes={clearTypeFilters}
          onClearAll={clearAllFilters}
          searchTerm={searchTerm}
          searchExpanded={searchExpanded}
          onSearchChange={handleSearchChange}
          onSearchToggle={handleSearchToggle}
        />
      </div>
    </div>
  )
}
