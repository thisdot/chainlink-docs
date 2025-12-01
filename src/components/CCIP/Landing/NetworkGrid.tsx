import NetworkCard from "../Cards/NetworkCard.tsx"
import Grid from "./Grid.tsx"

interface NetworkGridProps {
  networks: {
    name: string
    totalLanes: number
    totalTokens: number
    logo: string
    chain: string
  }[]
  environment: string
}

const BEFORE_SEE_MORE = 2 * 4 // Number of networks to show before the "See more" button, 2 rows x 4 items

function NetworkGrid({ networks, environment }: NetworkGridProps) {
  return (
    <Grid
      items={networks}
      initialDisplayCount={BEFORE_SEE_MORE}
      seeMoreLabel="View all networks"
      renderItem={(chain) => (
        <a href={`/ccip/directory/${environment}/chain/${chain.chain}`} key={chain.chain}>
          <NetworkCard
            name={chain.name}
            totalLanes={chain.totalLanes}
            totalTokens={chain.totalTokens}
            logo={chain.logo}
          />
        </a>
      )}
    />
  )
}

export default NetworkGrid
