import { useState, useEffect, useCallback } from 'react'
import { guardarNotas, cargarNotas } from '../utils/storage'
import { Nota } from '../types'

function useNotes() {
  const [notas, setNotas] = useState<Nota[]>(() => cargarNotas())

  useEffect(() => {
    guardarNotas(notas)
  }, [notas])

  const agregarNota = (color: string): Nota => {
    const nuevaNota: Nota = {
      id: Date.now().toString(),
      contenido: '',
      color: color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categoria: '',
      tags: [],
      fijada: false,
      importante: false
    }
    setNotas(prev => [nuevaNota, ...prev])
    return nuevaNota
  }

  const actualizarNota = useCallback((id: string, cambios: Partial<Nota>) => {
    setNotas(prev => prev.map(nota => {
      if (nota.id === id) {
        return {
          ...nota,
          ...cambios,
          updatedAt: new Date().toISOString()
        }
      }
      return nota
    }))
  }, [])

  const eliminarNota = useCallback((id: string) => {
    setNotas(prev => prev.filter(nota => nota.id !== id))
  }, [])

  const obtenerNota = useCallback((id: string): Nota | undefined => {
    return notas.find(nota => nota.id === id)
  }, [notas])

  return {
    notas,
    agregarNota,
    actualizarNota,
    eliminarNota,
    obtenerNota
  }
}

export default useNotes
