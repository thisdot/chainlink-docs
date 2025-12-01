import TokenCard from "../Cards/TokenCard.tsx"
import Grid from "../Landing/Grid.tsx"

interface TokenGridProps {
  tokens: {
    id: string
    logo: string
  }[]
  environment: string
}

const BEFORE_SEE_MORE = 2 * 4 // Number of tokens to show before the "See more" button, 2 rows x 4 items

function TokenGrid({ tokens, environment }: TokenGridProps) {
  return (
    <Grid
      items={tokens}
      initialDisplayCount={BEFORE_SEE_MORE}
      seeMoreLabel="View all tokens"
      renderItem={(token) => (
        <TokenCard
          id={token.id}
          key={token.id}
          logo={token.logo}
          link={`/ccip/directory/${environment}/token/${token.id}`}
        />
      )}
    />
  )
}

export default TokenGrid
