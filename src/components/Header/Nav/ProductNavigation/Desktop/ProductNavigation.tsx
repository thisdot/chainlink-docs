import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import React from "react"
import { ProductsNav, SubProductsNav } from "../../config"
import { isMatchedPath } from "../../isMatchedPath"
import { clsx } from "../../utils"
import { extendRadixComponent } from "../extendRadixComponent"
import styles from "./productNavigation.module.css"
import { CaretIcon } from "../CaretIcon"

type Props = {
  path: string
  setNavMenuOpen: (navMenuOpen: boolean) => void
  productsNav: ProductsNav
  subProductsNav?: SubProductsNav
  showMegaMenu: () => void
}

const Root = extendRadixComponent(NavigationMenu.Root)
const List = extendRadixComponent(NavigationMenu.List)
const Item = extendRadixComponent(NavigationMenu.Item)

export const ProductNavigation = ({ path, setNavMenuOpen, subProductsNav, showMegaMenu }: Props) => {
  const productMenuRef = React.useRef<HTMLButtonElement>(null)
  const productMenuDataset = productMenuRef.current?.dataset ?? {}
  const productMenuOpen = React.useMemo(() => productMenuDataset.state === "open", [productMenuDataset.state])
  const subProductMenuRef = React.useRef<HTMLButtonElement>(null)
  const subProductMenuDataset = subProductMenuRef.current?.dataset ?? {}
  const subProductMenuOpen = React.useMemo(() => subProductMenuDataset.state === "open", [subProductMenuDataset.state])

  React.useEffect(() => setNavMenuOpen(productMenuOpen || subProductMenuOpen), [productMenuOpen, subProductMenuOpen])

  const subProductTrigger = subProductsNav?.find(({ href }) => isMatchedPath(path, href))

  const label = subProductTrigger?.label || "Resources"
  const icon = subProductTrigger?.label ? subProductTrigger.icon : undefined

  return (
    <>
      <Root className={clsx(styles.root, styles.alignLeft)}>
        <List className={styles.list}>
          <Item>
            {/* <RadixTrigger>
              <Trigger label="Resources" className={styles.trigger} />
            </RadixTrigger>

            <NavigationMenu.Content className={styles.resourcesMenuContent}>
              <div className={styles.resourcesMenuContentMain}>
                <div className={styles.resourcesMenuContentRow}>Row</div>
                <div className={styles.resourcesMenuContentRow}>Row</div>
                <div className={styles.resourcesMenuContentRow}>Row</div>
                <div className={styles.resourcesMenuContentRow}>Row</div>
              </div>
              <div className={styles.resourcesMenuContentFeatured}>
                <h2>Featured</h2>
                <img src="/images/quick-start.png" alt="" className={styles.featuredImage} />
              </div>
            </NavigationMenu.Content> */}
          </Item>
          <Item>
            <span className={styles.navLink} onClick={showMegaMenu}>
              Resources <CaretIcon aria-hidden />
            </span>
          </Item>
          <Item>
            <NavigationMenu.Link className={styles.navLink} href="https://dev.chain.link" target="_blank">
              Docs
            </NavigationMenu.Link>
          </Item>
          <Item>
            <NavigationMenu.Link className={styles.navLink} href="https://dev.chain.link" target="_blank">
              Demos
            </NavigationMenu.Link>
          </Item>
          <Item>
            <NavigationMenu.Link className={styles.navLink} href="https://dev.chain.link" target="_blank">
              Tools
            </NavigationMenu.Link>
          </Item>
          <Item>
            <NavigationMenu.Link className={styles.navLink} href="https://dev.chain.link" target="_blank">
              ChainLog
            </NavigationMenu.Link>
          </Item>
        </List>
      </Root>
      {/* <MegaMenu /> */}
    </>
  )
}
