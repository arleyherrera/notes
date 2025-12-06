import { useState, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Note } from '../../types'
import { formatDateShort } from '../../utils'
import FavoriteButton from './FavoriteButton'

interface NoteCardProps {
  note: Note
  onUpdate: (id: string, changes: Partial<Note>) => void
}

const NoteCard = memo(function NoteCard({ note, onUpdate }: NoteCardProps) {
  const [text, setText] = useState(note.content)
  const [hover, setHover] = useState(false)

  const saveContent = useCallback(() => {
    if (text !== note.content) {
      onUpdate(note.id, { content: text })
    }
  }, [text, note.content, note.id, onUpdate])

  const toggleFavorite = useCallback(() => {
    onUpdate(note.id, { favorite: !note.favorite })
  }, [note.id, note.favorite, onUpdate])

  const handleMouseEnter = useCallback(() => setHover(true), [])
  const handleMouseLeave = useCallback(() => setHover(false), [])

  return (
    <div
      className={`${note.color} rounded-2xl p-5 min-h-[180px] relative flex flex-col animate-slide-in`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FavoriteButton
        isFavorite={note.favorite}
        onToggle={toggleFavorite}
        visible={note.favorite || hover}
      />

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
          {formatDateShort(note.updatedAt)}
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
    </div>
  )
})

export default NoteCard
