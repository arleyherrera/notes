import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tag, Archive, Folder, Star, Calendar } from 'lucide-react'
import { SidebarEdit } from '../components/layout'
import { Toggle, InputField, NotFound, DropdownMenu } from '../components/common'
import { useNotes } from '../hooks'
import { formatDateNumeric, parseTags } from '../utils'
import { CATEGORIES } from '../constants'

function NoteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getNote, updateNote, deleteNote } = useNotes()

  const note = getNote(id || '')

  // Initialize state with lazy initializer (runs only once)
  const [content, setContent] = useState(() => note?.content || '')
  const [category, setCategory] = useState(() => note?.category || '')
  const [tagsInput, setTagsInput] = useState(() => (note?.tags || []).join(', '))
  const [favorite, setFavorite] = useState(() => note?.favorite || false)
  const [archived, setArchived] = useState(() => note?.archived || false)

  const saveChanges = useCallback(() => {
    if (!id) return
    updateNote(id, { content, category, tags: parseTags(tagsInput), favorite, archived })
    navigate('/')
  }, [id, tagsInput, content, category, favorite, archived, updateNote, navigate])

  const removeNote = useCallback(() => {
    if (!id) return
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id)
      navigate('/')
    }
  }, [id, deleteNote, navigate])

  const toggleArchived = useCallback(() => {
    setArchived(prev => !prev)
  }, [])

  const toggleFavorite = useCallback(() => {
    setFavorite(prev => !prev)
  }, [])

  const goBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const menuItems = useMemo(() => [
    { label: 'Delete', onClick: removeNote, variant: 'danger' as const }
  ], [removeNote])

  if (!note) {
    return <NotFound message="Note not found" actionText="Go back" onAction={goBack} />
  }

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarEdit />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
            <DropdownMenu items={menuItems} />
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
            <Toggle active={archived} onChange={toggleArchived} icon={Archive} text="Archived" />
          </div>

          <InputField label="Category" icon={Folder}>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 bg-transparent outline-none text-gray-700 cursor-pointer">
              <option value="">Select...</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </InputField>

          <div>
            <label className="block text-sm text-gray-500 mb-2 invisible">.</label>
            <Toggle active={favorite} onChange={toggleFavorite} icon={Star} text="Favorite" />
          </div>

          <InputField label="Date" icon={Calendar}>
            <span className="text-gray-700">{formatDateNumeric(note.createdAt)}</span>
          </InputField>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
