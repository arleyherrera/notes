import { memo } from 'react'

interface ColorPickerProps {
  onSelect: (color: string) => void
  vertical?: boolean
}

// Colors defined outside component - never recreated
const colors = [
  { name: 'Orange', className: 'bg-orange-300' },
  { name: 'Yellow', className: 'bg-yellow-300' },
  { name: 'Lime', className: 'bg-lime-300' },
  { name: 'Pink', className: 'bg-pink-300' },
  { name: 'Cyan', className: 'bg-cyan-300' },
  { name: 'Violet', className: 'bg-violet-300' },
]

const ColorPicker = memo(function ColorPicker({ onSelect, vertical }: ColorPickerProps) {
  return (
    <div className={`${vertical ? 'flex flex-col' : 'flex'} gap-2 p-2 bg-white rounded-lg shadow-lg`}>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelect(color.className)}
          className={`w-8 h-8 rounded-full ${color.className} hover:scale-110 transition-transform`}
          title={color.name}
        />
      ))}
    </div>
  )
})

export default ColorPicker
