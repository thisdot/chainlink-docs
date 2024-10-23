import { useState } from "react"
import NetworkCard from "../Cards/NetworkCard"
import SeeMore from "../SeeMore/SeeMore"
import "./NetworkGrid.css"

interface NetworkCardProps {
  networks: {
    name: string
    totalLanes: number
    totalTokens: number
    logo: string
    chain: string
  }[]
  environment: string
}

const BEFORE_SEE_MORE = 16 // Number of networks to show before the "See more" button, 16 because of 2 items x 8 rows

function NetworkGrid({ networks, environment }: NetworkCardProps) {
  const [seeMore, setSeeMore] = useState(networks.length <= BEFORE_SEE_MORE)
  return (
    <>
      <div className="networks__grid">
        {networks.slice(0, seeMore ? networks.length : BEFORE_SEE_MORE).map((chain) => (
          <a href={`/ccip/supported-networks/${environment}/chain/${chain.chain}`}>
            <NetworkCard
              name={chain.name}
              totalLanes={chain.totalLanes}
              totalTokens={chain.totalTokens}
              logo={chain.logo}
            />
          </a>
        ))}
      </div>
      {!seeMore && <SeeMore onClick={() => setSeeMore(!seeMore)} />}
    </>
  )
}

export default NetworkGrid
