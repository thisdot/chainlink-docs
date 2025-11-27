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
  onClose: () => void
  onClearAll: () => void
}

const Trigger = ({ label, count, isActive, onClick, onClose, onClearAll }: TriggerProps) => {
  return (
    <button className={clsx(styles.btn, isActive && styles.btnActive)} onClick={onClick}>
      <div>
        {label}
        {count > 0 && (
          <span>
            {count}{" "}
            <SvgX
              height={10}
              width={10}
              color="input-muted-more"
              onClick={(e) => {
                e.stopPropagation()
                onClearAll()
              }}
            />{" "}
          </span>
        )}
      </div>{" "}
      {isActive ? (
        <SvgX
          color="pill-active"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          height={10}
          width={10}
        />
      ) : (
        <SvgTaillessArrowDownSmall color="pill-active" />
      )}
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
    <button
      className={clsx(styles.pill, isSelected && styles.pillSelected)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {label}
      {isSelected && (
        <span>
          <SvgX color="pill-active" width={12} height={12} />
        </span>
      )}
    </button>
  )
}

interface MobileFiltersButtonProps {
  totalCount: number
  onClick: () => void
}

const MobileFiltersButton = ({ totalCount, onClick }: MobileFiltersButtonProps) => {
  return (
    <button className={styles.mobileFiltersBtn} onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 5h15M5 10h10M7.5 15h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {totalCount > 0 && <span className={styles.mobileBadge}>{totalCount}</span>}
    </button>
  )
}

interface FilterSectionProps {
  title: string
  count: number
  isExpanded: boolean
  options: string[]
  selectedValues: string[]
  onToggle: () => void
  onSelect: (value: string) => void
  onClearAll: () => void
}

const FilterSection = ({
  title,
  count,
  isExpanded,
  options,
  selectedValues,
  onToggle,
  onSelect,
  onClearAll,
}: FilterSectionProps) => {
  return (
    <div className={styles.filterSection}>
      <button className={styles.filterSectionHeader} onClick={onToggle}>
        <div className={styles.filterSectionTitle}>
          {title}
          {count > 0 && (
            <span className={styles.filterSectionCount}>
              {count}{" "}
              <SvgX
                height={10}
                width={10}
                color="input-muted-more"
                onClick={(e) => {
                  e.stopPropagation()
                  onClearAll()
                }}
              />
            </span>
          )}
        </div>
        <SvgTaillessArrowDownSmall
          color="pill-active"
          className={clsx(styles.filterSectionChevron, isExpanded && styles.filterSectionChevronOpen)}
        />
      </button>
      {isExpanded && (
        <div className={styles.filterSectionContent}>
          {options.map((option) => (
            <FilterPill
              key={option}
              label={option}
              isSelected={selectedValues.includes(option)}
              onClick={() => onSelect(option)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MobileFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  products: string[]
  networks: string[]
  types: string[]
  selectedProducts: string[]
  selectedNetworks: string[]
  selectedTypes: string[]
  onSelectProduct: (value: string) => void
  onSelectNetwork: (value: string) => void
  onSelectType: (value: string) => void
  onClearAll: () => void
  expandedSection: FilterType
  onToggleSection: (section: FilterType) => void
  onClearProducts: () => void
  onClearNetworks: () => void
  onClearTypes: () => void
}

const MobileFiltersModal = ({
  isOpen,
  onClose,
  products,
  networks,
  types,
  selectedProducts,
  selectedNetworks,
  selectedTypes,
  onSelectProduct,
  onSelectNetwork,
  onSelectType,
  onClearAll,
  expandedSection,
  onToggleSection,
  onClearProducts,
  onClearNetworks,
  onClearTypes,
}: MobileFiltersModalProps) => {
  if (!isOpen) return null

  return (
    <>
      <div className={styles.mobileModalBackdrop} onClick={onClose} />
      <div className={styles.mobileModal}>
        <div className={styles.mobileModalHeader}>
          <h3 className={styles.mobileModalTitle}>Filters</h3>
          <button className={styles.mobileModalClose} onClick={onClose}>
            <SvgX color="pill-active" />
          </button>
        </div>
        <div className={styles.mobileModalBody}>
          <FilterSection
            title="Product"
            count={selectedProducts.length}
            isExpanded={expandedSection === "product"}
            options={products}
            selectedValues={selectedProducts}
            onToggle={() => onToggleSection(expandedSection === "product" ? null : "product")}
            onSelect={onSelectProduct}
            onClearAll={onClearProducts}
          />
          <FilterSection
            title="Network"
            count={selectedNetworks.length}
            isExpanded={expandedSection === "network"}
            options={networks}
            selectedValues={selectedNetworks}
            onToggle={() => onToggleSection(expandedSection === "network" ? null : "network")}
            onSelect={onSelectNetwork}
            onClearAll={onClearNetworks}
          />
          <FilterSection
            title="Type"
            count={selectedTypes.length}
            isExpanded={expandedSection === "type"}
            options={types}
            selectedValues={selectedTypes}
            onToggle={() => onToggleSection(expandedSection === "type" ? null : "type")}
            onSelect={onSelectType}
            onClearAll={onClearTypes}
          />
        </div>
        <div className={styles.mobileModalFooter}>
          <button className={styles.mobileModalClearAll} onClick={onClearAll}>
            Clear All
          </button>
          <button className={styles.mobileModalApply} onClick={onClose}>
            Apply
          </button>
        </div>
      </div>
    </>
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
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

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

  // Detect mobile viewport
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Disable body scroll when mobile modal is open
  useEffect(() => {
    if (typeof window === "undefined") return

    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileFiltersOpen])

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

  const searchClickHandler = (value: boolean) => {
    setSearchExpanded(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const toggleFilter = (filterType: FilterType) => {
    // Only open, don't close if already active
    setActiveFilter(filterType)
  }

  const closeFilter = () => {
    setActiveFilter(null)
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

  const totalFilterCount = selectedProducts.length + selectedNetworks.length + selectedTypes.length

  return (
    <>
      <div className={styles.wrapper}>
        {!isMobile && activeFilter && (
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
          {!isMobile && !searchExpanded && (
            <>
              <Trigger
                label="Product"
                count={selectedProducts.length}
                isActive={activeFilter === "product"}
                onClick={() => toggleFilter("product")}
                onClose={closeFilter}
                onClearAll={clearProductFilters}
              />
              <Trigger
                label="Network"
                count={selectedNetworks.length}
                isActive={activeFilter === "network"}
                onClick={() => toggleFilter("network")}
                onClose={closeFilter}
                onClearAll={clearNetworkFilters}
              />
              <Trigger
                label="Type"
                count={selectedTypes.length}
                isActive={activeFilter === "type"}
                onClick={() => toggleFilter("type")}
                onClose={closeFilter}
                onClearAll={clearTypeFilters}
              />
            </>
          )}
          {isMobile && (
            <MobileFiltersButton totalCount={totalFilterCount} onClick={() => setIsMobileFiltersOpen(true)} />
          )}
          <SearchInput
            isExpanded={searchExpanded}
            onClick={searchClickHandler}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isMobile && (
        <MobileFiltersModal
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          products={products}
          networks={networks}
          types={types}
          selectedProducts={selectedProducts}
          selectedNetworks={selectedNetworks}
          selectedTypes={selectedTypes}
          onSelectProduct={(value) => toggleSelection("product", value)}
          onSelectNetwork={(value) => toggleSelection("network", value)}
          onSelectType={(value) => toggleSelection("type", value)}
          onClearAll={clearAllFilters}
          expandedSection={activeFilter}
          onToggleSection={setActiveFilter}
          onClearProducts={clearProductFilters}
          onClearNetworks={clearNetworkFilters}
          onClearTypes={clearTypeFilters}
        />
      )}
    </>
  )
}
