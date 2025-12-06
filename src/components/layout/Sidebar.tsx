import { useState, useRef, memo, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { ColorPicker } from '../common'
import { useClickOutside } from '../../hooks'

interface SidebarProps {
  onNewNote: (color: string) => void
}

const Sidebar = memo(function Sidebar({ onNewNote }: SidebarProps) {
  const [showColors, setShowColors] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const closeColorPicker = useCallback(() => {
    setShowColors(false)
  }, [])

  useClickOutside(pickerRef, showColors, closeColorPicker)

  const createNote = useCallback((color: string) => {
    onNewNote(color)
    setShowColors(false)
  }, [onNewNote])

  const toggleColors = useCallback(() => {
    setShowColors(prev => !prev)
  }, [])

  return (
    <div className="w-28 bg-white min-h-screen flex flex-col items-center py-6 border-r border-gray-200">
      <div className="text-sm font-semibold text-gray-700">Docket</div>

      <div className="mt-16" />

      <div className="relative" ref={pickerRef}>
        <button
          onClick={toggleColors}
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
})

export default Sidebar
