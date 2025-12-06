import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MoreHorizontal, Tag, Archive, Folder, Star, Calendar } from 'lucide-react'
import { SidebarEdit } from '../components/layout'
import { Toggle, InputField } from '../components/common'
import useNotes from '../hooks/useNotes'

function NoteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getNote, updateNote, deleteNote } = useNotes()

  const note = getNote(id || '')

  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [favorite, setFavorite] = useState(false)
  const [archived, setArchived] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [initialized, setInitialized] = useState(false)

  if (note && !initialized) {
    setContent(note.content)
    setCategory(note.category || '')
    setTagsInput((note.tags || []).join(', '))
    setFavorite(note.favorite)
    setArchived(note.archived || false)
    setInitialized(true)
  }

  const saveChanges = () => {
    if (!id) return
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t)
    updateNote(id, { content, category, tags: tagsArray, favorite, archived })
    navigate('/')
  }

  const removeNote = () => {
    if (!id) return
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id)
      navigate('/')
    }
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Note not found</p>
          <button onClick={() => navigate('/')} className="text-blue-500 hover:underline">Go back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarEdit />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
              {showMenu && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 z-10 min-w-[120px]">
                  <button onClick={removeNote} className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50">Delete</button>
                </div>
              )}
            </div>
          </div>
          <button onClick={saveChanges} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">Save</button>
        </div>

        <div className={`${note.color} rounded-xl p-6 mb-8`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full bg-transparent resize-none outline-none min-h-[150px] text-gray-800 text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <InputField label="Tags" icon={Tag}>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="UX, Design, Tech"
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
          </InputField>

          <div>
            <label className="block text-sm text-gray-500 mb-2 invisible">.</label>
            <Toggle active={archived} onChange={() => setArchived(!archived)} icon={Archive} text="Archived" />
          </div>

          <InputField label="Category" icon={Folder}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 bg-transparent outline-none text-gray-700 cursor-pointer">
              <option value="">Select...</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Ideas">Ideas</option>
              <option value="Projects">Projects</option>
            </select>
          </InputField>

          <div>
            <label className="block text-sm text-gray-500 mb-2 invisible">.</label>
            <Toggle active={favorite} onChange={() => setFavorite(!favorite)} icon={Star} text="Favorite" />
          </div>

          <InputField label="Date" icon={Calendar}>
            <span className="text-gray-700">{formatDate(note.createdAt)}</span>
          </InputField>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
