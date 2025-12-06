import { memo, useCallback, MouseEvent } from 'react'
import { Star } from 'lucide-react'

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  visible?: boolean
}

const FavoriteButton = memo(function FavoriteButton({ isFavorite, onToggle, visible = true }: FavoriteButtonProps) {
  const handleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle()
  }, [onToggle])

  if (!visible) return null

  return (
    <button
      onClick={handleClick}
      className={`absolute top-3 right-3 p-1 ${!isFavorite ? 'opacity-50 hover:opacity-100' : ''}`}
    >
      <Star
        className={`w-5 h-5 ${isFavorite ? 'fill-gray-700 text-gray-700' : 'text-gray-600'}`}
      />
    </button>
  )
})

export default FavoriteButton
