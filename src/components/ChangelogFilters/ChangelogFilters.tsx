import styles from "./styles.module.css"
import type { ChangelogItem } from "~/components/ChangelogSnippet/types.ts"
import { DesktopFilters } from "./DesktopFilters.tsx"
import { MobileFilters } from "./MobileFilters.tsx"

export interface ChangelogFiltersProps {
  products: string[]
  networks: string[]
  types: string[]
  items: ChangelogItem[]
}

export const ChangelogFilters = ({ products, networks, types, items }: ChangelogFiltersProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desktopFilters}>
        <DesktopFilters products={products} networks={networks} types={types} items={items} />
      </div>
      <div className={styles.mobileFilters}>
        <MobileFilters products={products} networks={networks} types={types} items={items} />
      </div>
    </div>
  )
}
