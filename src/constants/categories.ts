/**
 * Category constants
 * Open/Closed: Easy to extend by adding new categories
 */

export interface Category {
  value: string
  label: string
}

export const CATEGORIES: Category[] = [
  { value: 'Personal', label: 'Personal' },
  { value: 'Work', label: 'Work' },
  { value: 'Ideas', label: 'Ideas' },
  { value: 'Projects', label: 'Projects' }
]

export const DEFAULT_CATEGORY = ''
