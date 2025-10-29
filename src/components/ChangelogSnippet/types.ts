export const ALGOLIA_INDEX = {
  CCIP_CHAINS: "CCIP Network",
  CCIP_LANES: "CCIP Lane",
  CCIP_TOKENS: "CCIP Tokens",
  CCIP_TOKENS_ON_NETWORK: "CCIP Tokens on Network",
  LINK_TOKENS: "LINK Token",
  DATA_FEED: "Data Feed",
  DATA_STREAMS: "Data Stream",
  DATA_STREAMS_NETWORK: "Data Stream Network",
  FAUCET: "Faucet",
  SITE: "Site",
  DOCUMENTATION: "Documentation",
  QUICKSTART: "Quickstart",
  GUIDE: "Guide",
  TUTORIAL: "Tutorial",
  CHANGELOG: "Changelog",
  BOOTCAMP: "Bootcamp",
  BLOG_NEW: "blog_new",
  VIDEO: "Video",
} as const

export interface ChangelogItem {
  createdOn: string
  "date-of-release": string
  hash: string
  id: string
  lastPublished: string
  lastUpdated: string
  name: string
  networks: string
  slug: string
  "text-description": string
  topic: string
  type: string
  objectID: string
  _highlightResult?: {
    "date-of-release": Record<string, unknown>
    name: Record<string, unknown>
    "text-description": Record<string, unknown>
  }
}
