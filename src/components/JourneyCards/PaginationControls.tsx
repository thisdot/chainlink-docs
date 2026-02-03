interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
  containerClassName?: string
  buttonClassName?: string
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  containerClassName,
  buttonClassName,
}: PaginationControlsProps) => {
  // Only render when there's more than one page
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={containerClassName}>
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={buttonClassName}
        aria-label="Previous page"
      >
        ←
      </button>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={buttonClassName}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  )
}
