import { useMemo, memo } from 'react'
import NoteCard from './NoteCard'
import { EmptyState } from '../common'
import { Note } from '../../types'

interface NoteGridProps {
  notes: Note[]
  onUpdate: (id: string, changes: Partial<Note>) => void
}

const NoteGrid = memo(function NoteGrid({ notes, onUpdate }: NoteGridProps) {
  // Memoize sorted notes to avoid sorting on every render
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })
  }, [notes])

  if (notes.length === 0) {
    return <EmptyState message="No notes yet. Create a new one!" />
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
})

export default NoteGrid
