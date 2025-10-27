import styles from "./megaMenu.module.css"
import ccipLogo from "../../../../../assets/product-logos/ccip-logo.svg"
import dataFeedsLogo from "../../../../../assets/product-logos/data-feeds-logo.svg"
import dataStreamsLogo from "../../../../../assets/product-logos/data-streams-logo.svg"
import dataLinkLogo from "../../../../../assets/product-logos/datalink-logo.svg"
import functionsLogo from "../../../../../assets/product-logos/functions-logo.svg"
import automationLogo from "../../../../../assets/product-logos/automation-logo.svg"
import vrfLogo from "../../../../../assets/product-logos/vrf-logo.svg"
import dtaLogo from "../../../../../assets/product-logos/dta-logo.svg"
import generalGlobeLogo from "../../../../../assets/product-logos/general-globe-logo.svg"
import nodesLogo from "../../../../../assets/product-logos/nodes-logo.svg"
import chainlinkLocalLogo from "../../../../../assets/product-logos/chainlink-local-2-logo.svg"
import creLogo from "../../../../../assets/product-logos/cre-logo.svg"
import { Typography } from "@chainlink/blocks"

const BlueSquare = () => {
  return (
    <div
      style={{
        background: "var(--brand)",
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

const GroupItem = ({ data }: { data: GroupItem }) => {
  return (
    <a href={data.link} className={styles.groupItem}>
      <img src={data.icon.src} alt={data.title} className={styles.groupItemIcon} />
      <div>
        <Typography
          variant="body-semi"
          style={{
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {data.title}
        </Typography>
        <Typography color="muted" variant="body-s" className={styles.groupItemDescription}>
          {data.description}
        </Typography>
      </div>
    </a>
  )
}

const GroupTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="code-s"
      color="muted"
      style={{ textTransform: "uppercase", lineHeight: "12px", letterSpacing: "0.6px" }}
    >
      {children}
    </Typography>
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
        link: "/ccip",
      },
    ],
  },
  data: {
    title: "Data",
    items: [
      {
        icon: dataStreamsLogo,
        title: "Data Streams",
        description: "Access high-frequency market data for next-gen DeFi",
        link: "/data-streams",
      },
      {
        icon: dataFeedsLogo,
        title: "Market and Data Feeds",
        description: "Utilize ultra-secure onchain data for smart contracts",
        link: "/data-feeds",
      },
      {
        icon: dataLinkLogo,
        title: "DataLink",
        description: "Publish and commercialize institutional data across...",
        link: "/datalink",
      },
    ],
  },
  assetManagement: {
    title: "Asset Management",
    items: [
      {
        icon: dtaLogo,
        title: "Digital Transfer Agent (DTA) Technical Standard",
        description: "Unlock streamlined tokenized fund operations",
        link: "/dta-technical-standard",
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
        link: "/chainlink-functions",
      },
      {
        icon: automationLogo,
        title: "Automation",
        description: "Automate smart contracts via decentralized triggers",
        link: "/chainlink-automation",
      },
      {
        icon: vrfLogo,
        title: "VRF",
        description: "Ensure fair outcomes in games, NFTs, and more",
        link: "/vrf",
      },
    ],
  },
  orchestration: {
    title: "Orchestration",
    items: [
      {
        icon: creLogo,
        title: "Chainlink Runtime Environment (CRE)",
        description: "The global orchestration layer",
        link: "/",
      },
    ],
  },
  other: {
    title: "More",
    items: [
      {
        icon: generalGlobeLogo,
        title: "General",
        description: "Foundational Chainlink knowledge",
        link: "/getting-started/conceptual-overview",
      },
      {
        icon: nodesLogo,
        title: "Nodes",
        description: "Be part of the Chainlink Network",
        link: "/",
      },
      {
        icon: chainlinkLocalLogo,
        title: "Chainlink local",
        description: "Run services locally before transitioning to a testnet",
        link: "/chainlink-local",
      },
    ],
  },
}

function MegaMenu() {
  return (
    <div className={styles.wrapper}>
      {/* Row 1: Orchestration, Interoperability, Asset Management */}
      <div className={styles.row}>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.orchestration.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.orchestration.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.interoperability.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.interoperability.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.assetManagement.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.assetManagement.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Data, Compute, More */}
      <div className={styles.row}>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.data.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.data.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.compute.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.compute.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <header>
            <BlueSquare />
            <GroupTitle>{megaMenuSections.other.title}</GroupTitle>
          </header>
          <div className={styles.itemList}>
            {megaMenuSections.other.items.map((link) => (
              <GroupItem key={link.title} data={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
