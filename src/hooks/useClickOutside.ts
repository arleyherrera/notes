import { useEffect, RefObject } from 'react'

/**
 * Custom hook to detect clicks outside a referenced element
 * Single Responsibility: Only handles click outside detection
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onClickOutside: () => void
): void {
  useEffect(() => {
    if (!isActive) return

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, isActive, onClickOutside])
}

export default useClickOutside
