/**
 * Date formatting utilities
 * Single Responsibility: Only handles date formatting
 */

export function formatDateShort(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

export function formatDateNumeric(date: string): string {
  const d = new Date(date)
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
}
