import type { RateLimiterConfig } from "~/lib/ccip/types/index.ts"
import { RateLimitCell } from "~/components/CCIP/RateLimitCell.tsx"

export interface NetworkLaneRowNoVerifiersProps {
  networkDetails: { name: string; logo: string }
  tokenPaused: boolean
  mechanism: string
  allLimits: { standard: RateLimiterConfig | null; ftf: RateLimiterConfig | null }
  isLoadingRateLimits: boolean
}

export function NetworkLaneRowNoVerifiers({
  networkDetails,
  tokenPaused,
  mechanism,
  allLimits,
  isLoadingRateLimits,
}: NetworkLaneRowNoVerifiersProps) {
  return (
    <tr className={tokenPaused ? "ccip-table__row--paused" : ""}>
      <td>
        <div className={`ccip-table__network-name ${tokenPaused ? "ccip-table__network-name--paused" : ""}`}>
          <img src={networkDetails.logo} alt={`${networkDetails.name} blockchain logo`} className="ccip-table__logo" />
          {networkDetails.name}
          {tokenPaused && (
            <span className="ccip-table__paused-badge" title="Transfers are currently paused">
              ⏸️
            </span>
          )}
        </div>
      </td>
      <td>{mechanism}</td>
      <td>
        <RateLimitCell isLoading={isLoadingRateLimits} rateLimit={allLimits.standard} type="capacity" />
      </td>
      <td>
        <RateLimitCell isLoading={isLoadingRateLimits} rateLimit={allLimits.standard} type="rate" />
      </td>
      <td>
        <RateLimitCell isLoading={isLoadingRateLimits} rateLimit={allLimits.ftf} type="capacity" />
      </td>
      <td>
        <RateLimitCell isLoading={isLoadingRateLimits} rateLimit={allLimits.ftf} type="rate" />
      </td>
    </tr>
  )
}
