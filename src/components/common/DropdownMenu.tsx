import { memo, useCallback, useState, useRef } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useClickOutside } from '../../hooks'

interface MenuItem {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}

interface DropdownMenuProps {
  items: MenuItem[]
}

const DropdownMenu = memo(function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useClickOutside(menuRef, isOpen, closeMenu)

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleItemClick = useCallback((onClick: () => void) => {
    onClick()
    setIsOpen(false)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggle} className="p-1 hover:bg-gray-100 rounded">
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 z-10 min-w-[120px]">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.onClick)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                item.variant === 'danger' ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

export default DropdownMenu
