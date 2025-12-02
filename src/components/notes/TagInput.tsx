import { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

function TagInput({ tags, onChange }: TagInputProps) {
  const [input, setInput] = useState('')

  const agregarTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()

      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()])
      }
      setInput('')
    }
  }

  const eliminarTag = (tagAEliminar: string) => {
    onChange(tags.filter(tag => tag !== tagAEliminar))
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[42px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
        >
          {tag}
          <button onClick={() => eliminarTag(tag)} className="hover:text-red-500">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={agregarTag}
        placeholder="Agregar tag..."
        className="flex-1 min-w-[100px] outline-none bg-transparent"
      />
    </div>
  )
}

export default TagInput
