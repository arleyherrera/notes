/**
 * Storage Service
 * Handles all localStorage operations for notes persistence
 */

import { Note } from '../types'

const STORAGE_KEY = 'my-notes'

export const storageService = {
  save(notes: Note[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  },

  load(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading notes:', error)
      return []
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing notes:', error)
    }
  }
}
