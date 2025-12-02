import { useState, useEffect, useCallback } from 'react'
import { guardarNotas, cargarNotas } from '../utils/storage.jsx'

function useNotes() {
  const [notas, setNotas] = useState([])
  const [cargando, setCargando] = useState(true)


  useEffect(() => {
    const notasGuardadas = cargarNotas()
    setNotas(notasGuardadas)
    setCargando(false)
  }, [])


  useEffect(() => {
    if (!cargando) {
      guardarNotas(notas)
    }
  }, [notas, cargando])


  const agregarNota = (color) => {
    const nuevaNota = {
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


  const actualizarNota = useCallback((id, cambios) => {
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


  const eliminarNota = useCallback((id) => {
    setNotas(prev => prev.filter(nota => nota.id !== id))
  }, [])


  const obtenerNota = useCallback((id) => {
    return notas.find(nota => nota.id === id)
  }, [notas])

  return {
    notas,
    cargando,
    agregarNota,
    actualizarNota,
    eliminarNota,
    obtenerNota
  }
}

export default useNotes
