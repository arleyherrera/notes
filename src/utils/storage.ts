import { Nota } from '../types'

const STORAGE_KEY = 'mis-notas'

export function guardarNotas(notas: Nota[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas))
  } catch (error) {
    console.error('Error guardando notas:', error)
  }
}

export function cargarNotas(): Nota[] {
  try {
    const datos = localStorage.getItem(STORAGE_KEY)
    if (datos) {
      return JSON.parse(datos)
    }
    return []
  } catch (error) {
    console.error('Error cargando notas:', error)
    return []
  }
}
