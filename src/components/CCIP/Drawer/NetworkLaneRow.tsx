import type { RateLimiterConfig } from "~/lib/ccip/types/index.ts"
import { RateLimitCell } from "~/components/CCIP/RateLimitCell.tsx"

export interface NetworkLaneRowProps {
  networkDetails: { name: string; logo: string }
  tokenPaused: boolean
  isExpanded: boolean
  showAccordion: boolean
  onToggle: () => void
  mechanism: string
  allLimits: { standard: RateLimiterConfig | null; ftf: RateLimiterConfig | null }
  isLoadingRateLimits: boolean
}

export function NetworkLaneRow({
  networkDetails,
  tokenPaused,
  isExpanded,
  showAccordion,
  onToggle,
  mechanism,
  allLimits,
  isLoadingRateLimits,
}: NetworkLaneRowProps) {
  return (
    <tr
      className={`${showAccordion ? "ccip-table__accordion-row" : ""} ${tokenPaused ? "ccip-table__row--paused" : ""} ${isExpanded ? "ccip-table__accordion-row--expanded" : ""}`}
      onClick={showAccordion ? onToggle : undefined}
      role={showAccordion ? "button" : undefined}
      tabIndex={showAccordion ? 0 : undefined}
      aria-expanded={showAccordion ? isExpanded : undefined}
      aria-label={showAccordion ? `${isExpanded ? "Hide" : "Show"} verifiers for ${networkDetails.name}` : undefined}
      onKeyDown={
        showAccordion
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onToggle()
              }
            }
          : undefined
      }
    >
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
      {showAccordion && (
        <td>
          <div className="ccip-table__verifier-toggle">
            <svg
              className={`ccip-table__expand-icon ${isExpanded ? "ccip-table__expand-icon--expanded" : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </td>
      )}
    </tr>
  )
}
