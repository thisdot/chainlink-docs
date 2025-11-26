import { SvgSearch, SvgTaillessArrowDownSmall, SvgX } from "@chainlink/blocks"
import styles from "./styles.module.css"
import { useState } from "react"
import { clsx } from "~/lib/clsx/clsx.ts"

const SearchInput = ({ isExpanded, onClick }: { isExpanded: boolean; onClick: (value: boolean) => void }) => {
  return (
    <div className={clsx(styles.searchInputWrapper, isExpanded && styles.expanded)} onClick={() => onClick(true)}>
      <SvgSearch className={styles.searchIcon} color="pill-active" />
      <input
        placeholder={!isExpanded ? "Search" : "Search a product, network or type"}
        className={styles.searchInput}
      />
      {isExpanded && (
        <SvgX
          color="pill-active"
          onClick={(e) => {
            e.stopPropagation()
            onClick(false)
          }}
          style={{
            marginRight: "var(--space-4x)",
          }}
        />
      )}
    </div>
  )
}

const Trigger = ({ label }: { label: string }) => {
  return (
    <button className={styles.btn}>
      <span>{label}</span> <SvgTaillessArrowDownSmall color="pill-active" />
    </button>
  )
}

export const ChangelogFilters = () => {
  const [searchExpanded, setSearchExpanded] = useState(false)

  const searchClickHandler = (value: boolean) => {
    setSearchExpanded(value)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.expandedContent}></div>
      <div className={styles.content}>
        {!searchExpanded && (
          <>
            <Trigger label="Product" />
            <Trigger label="Network" />
            <Trigger label="Type" />
          </>
        )}
        <SearchInput isExpanded={searchExpanded} onClick={searchClickHandler} />
      </div>
    </div>
  )
}
