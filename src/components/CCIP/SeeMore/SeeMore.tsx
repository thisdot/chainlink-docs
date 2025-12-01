import "./SeeMore.css"
interface SeeMoreProps {
  onClick?: () => void
  label?: string
}

function SeeMore({ onClick, label = "See more" }: SeeMoreProps) {
  return (
    <div className="seeMore__container">
      <button className="seeMore" onClick={onClick} aria-label={label}>
        {label}
      </button>
    </div>
  )
}

export default SeeMore
