import styles from "./styles.module.css"
import { useState, useEffect, useCallback } from "react"
import type { ChangelogItem } from "~/components/ChangelogSnippet/types"
import { matchesFilters } from "~/utils/changelogFilters"
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
