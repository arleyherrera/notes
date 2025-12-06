import { useState, useEffect, useCallback } from 'react'
import { saveNotes, loadNotes } from '../utils/storage'
import { Note } from '../types'

function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const addNote = (color: string): Note => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: '',
      color: color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: '',
      tags: [],
      pinned: false,
      favorite: false
    }
    setNotes(prev => [newNote, ...prev])
    return newNote
  }

  const updateNote = useCallback((id: string, changes: Partial<Note>) => {
    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        return {
          ...note,
          ...changes,
          updatedAt: new Date().toISOString()
        }
      }
      return note
    }))
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }, [])

  const getNote = useCallback((id: string): Note | undefined => {
    return notes.find(note => note.id === id)
  }, [notes])

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote
  }
}

export default useNotes
