import { evmProducts } from "~/features/landing/data/index.ts"
import styles from "./megaMenu.module.css"
import resourcesLogo from "../../../../../assets/product-logos/data-resources-logo.svg"
import { Fragment } from "react/jsx-runtime"
import { useEffect } from "react"
import ccipLogo from "../../../../../assets/product-logos/ccip-logo.svg"
import automatedComplianceEngineLogo from "../../../../../assets/product-logos/automated-compliance-engine.svg"
import dataFeedsLogo from "../../../../../assets/product-logos/data-feeds-logo.svg"
import dataStreamsLogo from "../../../../../assets/product-logos/data-streams-logo.svg"
import dataLinkVaultLogo from "../../../../../assets/product-logos/data-link-vault.svg"
import functionsLogo from "../../../../../assets/product-logos/functions-logo.svg"
import automationLogo from "../../../../../assets/product-logos/automation-logo.svg"
import vrfLogo from "../../../../../assets/product-logos/vrf-logo.svg"
import dtaLogo from "../../../../../assets/product-logos/dta-logo.svg"
import generalGlobeLogo from "../../../../../assets/product-logos/general-globe-logo.svg"
import nodesLogo from "../../../../../assets/product-logos/nodes-logo.svg"
import chainlinkLocalLogo from "../../../../../assets/product-logos/chainlink-local-2-logo.svg"
import creLogo from "../../../../../assets/product-logos/cre-logo.svg"

interface MegaMenuProps {
  cancel: () => void
  id?: string
}

const BlueSquare = () => {
  return (
    <div
      style={{
        background: "var(--Background-Accent, #0847F7)",
        height: "5px",
        width: "5px",
        display: "block",
      }}
    ></div>
  )
}

interface GroupItem {
  title: string
  description: string
  icon: ImageMetadata
  link: string
}

const GroupItem = ({ data, styleProp }: { data: GroupItem; styleProp?: React.CSSProperties }) => {
  return (
    <a href={data.link} className={styles.groupItem} style={styleProp ?? {}}>
      <img src={data.icon.src} alt={data.title} className={styles.groupItemIcon} />
      <div>
        <p className={styles.groupItemTitle}>{data.title}</p>
        <p className={styles.groupItemDescription}>{data.description}</p>
      </div>
    </a>
  )
}

export const megaMenuSections = {
  interoperability: {
    title: "Interoperability",
    items: [
      {
        icon: ccipLogo,
        title: "Cross-Chain Communication",
        description: "Move data and value across any blockchain",
        link: "#",
      },
    ],
  },
  compliance: {
    title: "Compliance",
    items: [
      {
        icon: automatedComplianceEngineLogo,
        title: "Automated Compliance Engine",
        description: "Enable compliance-focused digital assets",
        link: "#",
      },
    ],
  },
  data: {
    title: "Data",
    items: [
      {
        icon: dataFeedsLogo,
        title: "Market and Data Feeds",
        description: "Utilize ultra-secure onchain data for smart contracts",
        link: "#",
      },
      {
        icon: dataStreamsLogo,
        title: "Data Streams",
        description: "Access high-frequency market data for next-gen DeFi",
        link: "#",
      },
      {
        icon: dataLinkVaultLogo,
        title: "Data Link",
        description: "Verify tokenized and wrapped assets",
        link: "#",
      },
    ],
  },
  compute: {
    title: "Compute",
    items: [
      {
        icon: functionsLogo,
        title: "Functions",
        description: "Connect smart contracts to any API",
        link: "#",
      },
      {
        icon: automationLogo,
        title: "Automation",
        description: "Automate smart contracts via decentralized triggers",
        link: "#",
      },
      {
        icon: vrfLogo,
        title: "VRF",
        description: "Ensure fair outcomes in games, NFTs, and more",
        link: "#",
      },
    ],
  },
  orchestration: {
    title: "Orchestration",
    items: [
      {
        icon: creLogo,
        title: "Chainlink Runtime Environment (CRE)",
        description: "A composable, secure, and future-proof platform",
        link: "#",
      },
    ],
  },
  technicalStandards: {
    title: "Technical Standards",
    items: [
      {
        icon: dtaLogo,
        title: "DTA",
        description: "Technical standards for subscriptions and redemptions",
        link: "#",
      },
    ],
  },
  other: {
    title: "Other",
    items: [
      {
        icon: generalGlobeLogo,
        title: "General",
        description: "Foundational Chainlink knowledge",
        link: "#",
      },
      {
        icon: nodesLogo,
        title: "Nodes",
        description: "Be part of the Chainlink Network",
        link: "#",
      },
      {
        icon: chainlinkLocalLogo,
        title: "Chainlink local",
        description: "Run services locally before transitioning to a testnet",
        link: "#",
      },
    ],
  },
}

function MegaMenu({ cancel, id }: MegaMenuProps) {
  useEffect(() => {
    const onESC = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        cancel()
      }
    }
    window.addEventListener("keyup", onESC, false)
    return () => {
      window.removeEventListener("keyup", onESC, false)
    }
  }, [])

  return (
    <div className={styles.megaMenuContainer} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.menuSection__primary}>
          <div className={styles.menuSection__nested}>
            <div className={styles.menuSection__group}>
              <div>
                <header
                  style={{
                    borderLeft: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                    borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                  }}
                >
                  <BlueSquare />
                  <p>{megaMenuSections.interoperability.title}</p>
                </header>

                <div className={styles.itemList}>
                  {megaMenuSections.interoperability.items.map((link) => (
                    <GroupItem key={link.title} data={link} />
                  ))}
                </div>
              </div>
              <div>
                <header
                  style={{
                    borderLeft: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                    borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                    borderTop: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                  }}
                >
                  <BlueSquare />
                  <p>{megaMenuSections.compliance.title}</p>
                </header>

                <div>
                  {megaMenuSections.compliance.items.map((link) => (
                    <GroupItem
                      key={link.title}
                      data={link}
                      styleProp={{
                        borderLeft: "1px solid var(--gray-200)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className={styles.menuSection__data}
              style={{
                borderLeft: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
              }}
            >
              <header
                style={{
                  borderRight: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                  borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                }}
              >
                <BlueSquare />
                <p>{megaMenuSections.data.title}</p>
              </header>

              <div>
                {megaMenuSections.data.items.map((link) => (
                  <GroupItem
                    key={link.title}
                    data={link}
                    styleProp={{
                      borderRight: "1px solid var(--gray-200)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.menuSection__compute}>
              <header
                style={{
                  borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                }}
              >
                <BlueSquare />
                <p>{megaMenuSections.compute.title}</p>
              </header>

              <div>
                {megaMenuSections.compute.items.map((link) => (
                  <GroupItem key={link.title} data={link} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.menuSection__orchestration}>
            <header
              style={{
                borderLeft: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                borderTop: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
              }}
            >
              <BlueSquare />
              <p>{megaMenuSections.orchestration.title}</p>
            </header>

            <div>
              {megaMenuSections.orchestration.items.map((link) => (
                <GroupItem key={link.title} data={link} />
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles.menuSection__secondary}
          style={{
            borderLeft: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
          }}
        >
          <div className={styles.menuSection__technicalStandards}>
            <header
              style={{
                borderRight: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
              }}
            >
              <BlueSquare />
              <p>{megaMenuSections.technicalStandards.title}</p>
            </header>

            <div>
              {megaMenuSections.technicalStandards.items.map((link) => (
                <GroupItem
                  key={link.title}
                  data={link}
                  styleProp={{
                    borderRight: "1px solid var(--gray-200)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.menuSection__other}>
            <header
              style={{
                borderRight: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                borderBottom: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
                borderTop: "1px solid var(--Border-Grid, rgba(22, 37, 65, 0.13))",
              }}
            >
              <BlueSquare />
              <p>{megaMenuSections.other.title}</p>
            </header>

            <div>
              {megaMenuSections.other.items.map((link) => (
                <GroupItem
                  key={link.title}
                  data={link}
                  styleProp={{
                    borderRight: "1px solid var(--gray-200)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
