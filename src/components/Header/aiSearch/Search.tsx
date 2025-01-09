import { SearchButton } from "chainlink-algolia-search"
import "chainlink-algolia-search/dist/index.css"

export const Search = ({
  variant = "default",
  algoliaVars: { algoliaAppId, algoliaPublicApiKey },
}: {
  variant?: "default" | "mobile"
  algoliaVars: { algoliaAppId: string; algoliaPublicApiKey: string }
}) => {
  return <SearchButton algoliaAppId={algoliaAppId} algoliaPublicApiKey={algoliaPublicApiKey} />
}
