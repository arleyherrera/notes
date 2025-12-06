import NoteCard from './NoteCard'
import { Note } from '../../types'

interface NoteGridProps {
  notes: Note[]
  onUpdate: (id: string, changes: Partial<Note>) => void
}

function NoteGrid({ notes, onUpdate }: NoteGridProps) {
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No notes yet. Create a new one!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default NoteGrid
