import { useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Star, Pencil } from 'lucide-react'
import { Note } from '../../types'

interface NoteCardProps {
  note: Note
  onUpdate: (id: string, changes: Partial<Note>) => void
}

function NoteCard({ note, onUpdate }: NoteCardProps) {
  const [text, setText] = useState(note.content)
  const [hover, setHover] = useState(false)

  const saveContent = () => {
    if (text !== note.content) {
      onUpdate(note.id, { content: text })
    }
  }

  const toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onUpdate(note.id, { favorite: !note.favorite })
  }

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  return (
    <div
      className={`${note.color} rounded-2xl p-5 min-h-[180px] relative flex flex-col animate-slide-in`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {note.favorite && (
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-1"
        >
          <Star className="w-5 h-5 fill-gray-700 text-gray-700" />
        </button>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={saveContent}
        placeholder="Write your note..."
        className="w-full bg-transparent resize-none outline-none flex-1 text-gray-800 font-medium leading-relaxed"
        style={{ minHeight: '100px' }}
      />

      <div className="flex justify-between items-end mt-2">
        <span className="text-sm text-gray-600">
          {formatDate(note.updatedAt)}
        </span>

        {hover && (
          <Link
            to={`/notes/${note.id}`}
            className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
          >
            <Pencil className="w-4 h-4 text-gray-700" />
          </Link>
        )}
      </div>

      {hover && !note.favorite && (
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-1 opacity-50 hover:opacity-100"
        >
          <Star className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default NoteCard
