import { useState, useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { ColorPicker } from '../common'

interface SidebarProps {
  onNewNote: (color: string) => void
}

function Sidebar({ onNewNote }: SidebarProps) {
  const [showColors, setShowColors] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowColors(false)
      }
    }

    if (showColors) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColors])

  const createNote = (color: string) => {
    onNewNote(color)
    setShowColors(false)
  }

  return (
    <div className="w-28 bg-white min-h-screen flex flex-col items-center py-6 border-r border-gray-200">
      {/* Logo */}
      <div className="text-sm font-semibold text-gray-700">Docket</div>

      {/* Spacer */}
      <div className="mt-16" />

      {/* Add button */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowColors(!showColors)}
          className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>

        {showColors && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
            <ColorPicker onSelect={createNote} vertical />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
