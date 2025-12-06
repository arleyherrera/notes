import { Note } from '../types'

/**
 * Note factory and utilities
 * Single Responsibility: Only handles note creation logic
 */

export function generateId(): string {
  return Date.now().toString()
}

export function createNote(color: string): Note {
  const now = new Date().toISOString()
  return {
    id: generateId(),
    content: '',
    color,
    createdAt: now,
    updatedAt: now,
    category: '',
    tags: [],
    pinned: false,
    favorite: false
  }
}

export function parseTags(tagsString: string): string[] {
  return tagsString
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)
}
