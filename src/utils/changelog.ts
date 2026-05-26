import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { marked } from "marked"
import type { AlgoliaQuery, ChangelogItem } from "~/components/ChangelogSnippet/types.ts"

const CHAINLINK_DOCS_URL = "https://docs.chain.link"
const GENERIC_TOKEN_ICON =
  "https://cdn.prod.website-files.com/64cc2c23d8dbd707cdb556d8/678f76f95f2fbf3fef5e80bb_generic-token.svg"

interface RawNetwork {
  displayName: string
  iconUrl: string
}

interface RawRelatedToken {
  assetName?: string
  baseAsset?: string
  quoteAsset?: string
  network?: string
  url: string
  iconUrl?: string
  productTypeCode?: string
  displayName?: string
}

interface RawNewNetwork {
  displayName: string
  network: string
  url: string
}

interface RawChangelogEntry {
  category: string
  date: string
  description: string
  title: string
  topic: string
  relatedNetworks?: string[]
  relatedTokens?: RawRelatedToken[]
  newNetworks?: RawNewNetwork[]
}

interface RawChangelog {
  networks: Record<string, RawNetwork>
  data: RawChangelogEntry[]
}

const CATEGORY_LABELS: Record<string, string> = {
  integration: "Integration",
  release: "Release",
  deprecation: "Deprecated",
  feature: "Feature",
  update: "Update",
  cre: "CRE",
  dta: "DTA",
  ace: "ACE",
}

const TOPIC_QUERY_MAP: Record<AlgoliaQuery, string> = {
  ccip: "CCIP",
  "data-streams": "Data Streams",
  "smart-data": "SmartData",
  nodes: "Nodes",
  "data-feeds": "Data Feeds",
  functions: "Functions",
  automation: "Automation",
  vrf: "VRF",
  general: "General",
}

let cached: ChangelogItem[] | undefined

function formatTitleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\./g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function ensureAbsoluteUrl(url: string): string {
  try {
    return new URL(url).href
  } catch {
    return new URL(url, CHAINLINK_DOCS_URL).href
  }
}

function formatLinksInDescription(description: string): string {
  const withMd = description.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text, href) => `[${text}](${ensureAbsoluteUrl(href)})`
  )
  return withMd.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, (_, href, text) => {
    return `<a href="${ensureAbsoluteUrl(href)}">${text}</a>`
  })
}

function categoryToType(category: string): string {
  const known = CATEGORY_LABELS[category.toLowerCase()]
  if (known) return known
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
}

function relatedNetworksHtml(entry: RawChangelogEntry, networks: Record<string, RawNetwork>): string {
  if (!entry.relatedNetworks || entry.relatedNetworks.length === 0) return ""

  const seen: string[] = []
  const icons: string[] = []

  entry.relatedNetworks.forEach((network, index) => {
    const info = networks[network]
    if (!info || !info.iconUrl || seen.includes(network)) return
    seen.push(network)

    const image =
      index < 4
        ? `<img src="${info.iconUrl}" loading="lazy" alt="${info.displayName}" class="log-item__img-chain" data-network="${info.iconUrl}"/>`
        : ""
    const hidden = `<div fs-cmsfilter-field="network" class="hidden">${info.displayName}</div>`
    icons.push((image + hidden).replace(/\n/g, ""))
  })

  if (icons.length === 0) return ""

  const moreNetworks =
    seen.length > 4
      ? `<div class="log-item__more-chains"><div>+${seen.length - 4}</div></div>`
      : ""

  return `<div class="log-item__list-chains">${icons.join("")}${moreNetworks}</div>`
}

function networkImage(network: string | undefined, networks: Record<string, RawNetwork>): string {
  if (network && networks[network]?.iconUrl) return networks[network].iconUrl
  return GENERIC_TOKEN_ICON
}

function networkName(network: string | undefined, networks: Record<string, RawNetwork>): string {
  if (network && networks[network]?.displayName) return networks[network].displayName
  return network || ""
}

function relatedTokenHtml(args: {
  iconUrl?: string
  network?: string
  linkLabel: string
  link: string
  additionalInfo?: string
  networks: Record<string, RawNetwork>
}): string {
  const { iconUrl, network, linkLabel, link, additionalInfo, networks } = args
  const html = `<div class="log-item__data-entry">
    <div class="log-item__data-entry-images">
      <img src="${GENERIC_TOKEN_ICON}" loading="lazy" alt="" class="log-item__data-entry-img" data-token="${iconUrl ?? ""}">
      ${network ? `<img src="${networkImage(network, networks)}" loading="lazy" alt="" class="log-item__data-entry-img-top" data-network="${networkImage(network, networks)}">` : ""}
    </div>
    <div class="log-item__data-entry-info"><a href="${link}">${linkLabel}</a></div>
    ${additionalInfo ? `<div class="log-item__data-entry-info2">${additionalInfo}</div>` : ""}
  </div>`
  return html.replace(/\n/g, "")
}

function relatedNetworkRowHtml(args: {
  network: string
  link: string
  linkLabel: string
  networks: Record<string, RawNetwork>
}): string {
  const { network, link, linkLabel, networks } = args
  const src = networkImage(network, networks)
  const html = `<div class="log-item__data-entry">
    <div class="log-item__data-entry-images">
      <img src="${src}" loading="lazy" alt="" class="log-item__data-entry-img" data-network="${src}">
    </div>
    <div class="log-item__data-entry-info"><a href="${link}">${linkLabel}</a></div>
  </div>`
  return html.replace(/\n/g, "")
}

function relatedItemsHtml(entry: RawChangelogEntry, networks: Record<string, RawNetwork>): string {
  const list = entry.relatedTokens || entry.newNetworks
  if (!list) return ""

  return list
    .map((raw) => {
      const entryAny = raw as RawRelatedToken & RawNewNetwork
      switch (entry.topic) {
        case "Data Streams": {
          let linkLabel = entryAny.baseAsset || ""
          if (entryAny.quoteAsset) linkLabel += ` / ${entryAny.quoteAsset}`
          return relatedTokenHtml({
            iconUrl: entryAny.iconUrl,
            network: entryAny.network,
            linkLabel,
            link: entryAny.url,
            networks,
          })
        }
        case "SmartData":
          return relatedTokenHtml({
            iconUrl: entryAny.iconUrl,
            network: entryAny.network,
            linkLabel: `${entryAny.baseAsset || ""} ${entryAny.productTypeCode || ""}`.trim(),
            link: entryAny.url,
            additionalInfo: networkName(entryAny.network, networks),
            networks,
          })
        case "Data Feeds": {
          let linkLabel = entryAny.baseAsset || ""
          if (entryAny.quoteAsset) linkLabel += ` / ${entryAny.quoteAsset}`
          return relatedTokenHtml({
            iconUrl: entryAny.iconUrl,
            network: entryAny.network,
            linkLabel,
            link: entryAny.url,
            additionalInfo: networkName(entryAny.network, networks),
            networks,
          })
        }
        case "CCIP":
          if (entryAny.displayName) {
            return relatedNetworkRowHtml({
              network: entryAny.network,
              link: entryAny.url,
              linkLabel: entryAny.displayName,
              networks,
            })
          }
          return relatedTokenHtml({
            iconUrl: entryAny.iconUrl,
            linkLabel: entryAny.assetName || "",
            link: entryAny.url,
            networks,
          })
        default:
          return ""
      }
    })
    .join("")
}

function buildDescription(entry: RawChangelogEntry): string {
  return formatLinksInDescription(entry.description)
}

function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true }).toString().replace(/\n/g, "")
}

function loadRaw(): RawChangelog {
  const path = resolve(process.cwd(), "public/changelog.json")
  return JSON.parse(readFileSync(path, "utf-8")) as RawChangelog
}

export function getChangelogItems(): ChangelogItem[] {
  if (cached) return cached

  const raw = loadRaw()

  cached = raw.data.map((entry, index) => {
    const slug = formatTitleToSlug(entry.title)
    const descriptionMd = buildDescription(entry)
    const descriptionHtml = markdownToHtml(descriptionMd)
    const tokenListHtml = relatedItemsHtml(entry, raw.networks)
    const dateIso = new Date(entry.date).toISOString()

    return {
      id: `${entry.date}-${slug}-${index}`,
      objectID: `${entry.date}-${slug}-${index}`,
      name: entry.title,
      slug,
      topic: entry.topic,
      type: categoryToType(entry.category),
      "date-of-release": dateIso,
      "text-description": descriptionHtml + tokenListHtml,
      networks: relatedNetworksHtml(entry, raw.networks),
      hash: "",
      createdOn: dateIso,
      lastPublished: dateIso,
      lastUpdated: dateIso,
    }
  })

  return cached
}

export function getLatestChangelogForTopic(query: AlgoliaQuery): ChangelogItem | undefined {
  const topic = TOPIC_QUERY_MAP[query]
  if (!topic) return undefined
  return getChangelogItems().find((item) => item.topic === topic)
}
