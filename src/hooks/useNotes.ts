import { useState, useCallback, useRef } from 'react'
import { storageService } from '../services'
import { createNote } from '../utils'
import { Note } from '../types'

function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => storageService.load())
  const isFirstRender = useRef(true)

  const saveToStorage = (updatedNotes: Note[]) => {
    if (!isFirstRender.current) {
      storageService.save(updatedNotes)
    }
    isFirstRender.current = false
  }

  const addNote = useCallback((color: string): Note => {
    const newNote = createNote(color)
    setNotes(prev => {
      const updated = [newNote, ...prev]
      saveToStorage(updated)
      return updated
    })
    return newNote
  }, [])

  const updateNote = useCallback((id: string, changes: Partial<Note>) => {
    setNotes(prev => {
      const updated = prev.map(note => {
        if (note.id === id) {
          return {
            ...note,
            ...changes,
            updatedAt: new Date().toISOString()
          }
        }
        return note
      })
      saveToStorage(updated)
      return updated
    })
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const updated = prev.filter(note => note.id !== id)
      saveToStorage(updated)
      return updated
    })
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
