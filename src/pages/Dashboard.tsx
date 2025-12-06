import { useState } from 'react'
import { Sidebar } from '../components/layout'
import { SearchBar } from '../components/common'
import { NoteGrid } from '../components/notes'
import useNotes from '../hooks/useNotes'

function Dashboard() {
  const { notes, addNote, updateNote } = useNotes()
  const [search, setSearch] = useState('')

  const filteredNotes = notes.filter(note => {
    return note.content.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onNewNote={addNote} />

      <div className="flex-1 p-8">

        <div className="mb-2">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Notes</h1>

        <NoteGrid notes={filteredNotes} onUpdate={updateNote} />
      </div>
    </div>
  )
}

export default Dashboard
