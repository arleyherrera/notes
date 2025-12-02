import { useState } from 'react'
import { Sidebar } from '../components/layout'
import { SearchBar } from '../components/common'
import { NoteGrid } from '../components/notes'
import useNotes from '../hooks/useNotes.jsx'

function Dashboard() {
  const { notas, cargando, agregarNota, actualizarNota } = useNotes()
  const [busqueda, setBusqueda] = useState('')


  const notasFiltradas = notas.filter(nota => {
    return nota.contenido.toLowerCase().includes(busqueda.toLowerCase())
  })

  if (cargando) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onNuevaNota={agregarNota} />

      <div className="flex-1 p-8">
      
        <div className="mb-2">
          <SearchBar valor={busqueda} onChange={setBusqueda} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-16">Notes</h1>

        <NoteGrid notas={notasFiltradas} onActualizar={actualizarNota} />
      </div>
    </div>
  )
}

export default Dashboard
