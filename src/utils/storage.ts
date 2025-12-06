import { Note } from '../types'

const STORAGE_KEY = 'my-notes'

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error('Error saving notes:', error)
  }
}

export function loadNotes(): Note[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error loading notes:', error)
    return []
  }
}
