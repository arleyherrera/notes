import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MoreHorizontal, Tag, Archive, Folder, Star, Calendar } from 'lucide-react'
import { SidebarEdit } from '../components/layout'
import { Toggle, InputField } from '../components/common'
import useNotes from '../hooks/useNotes.jsx'

function NoteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cargando, obtenerNota, actualizarNota, eliminarNota } = useNotes()

  const nota = !cargando ? obtenerNota(id) : null

  const [contenido, setContenido] = useState('')
  const [categoria, setCategoria] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [importante, setImportante] = useState(false)
  const [archivada, setArchivada] = useState(false)
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const [inicializado, setInicializado] = useState(false)

  // Inicializar formulario cuando la nota carga
  if (nota && !inicializado) {
    setContenido(nota.contenido)
    setCategoria(nota.categoria || '')
    setTagsInput((nota.tags || []).join(', '))
    setImportante(nota.importante)
    setArchivada(nota.archivada || false)
    setInicializado(true)
  }

  const guardarCambios = () => {
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t)
    actualizarNota(id, { contenido, categoria, tags: tagsArray, importante, archivada })
    navigate('/')
  }

  const borrarNota = () => {
    if (window.confirm('¿Seguro que quieres eliminar esta nota?')) {
      eliminarNota(id)
      navigate('/')
    }
  }

  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
  }

  if (cargando) {
    return <div className="flex items-center justify-center h-screen"><p className="text-gray-500">Cargando...</p></div>
  }

  if (!nota) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Nota no encontrada</p>
          <button onClick={() => navigate('/')} className="text-blue-500 hover:underline">Volver al inicio</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarEdit />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
            <div className="relative">
              <button onClick={() => setMostrarMenu(!mostrarMenu)} className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
              {mostrarMenu && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-2 z-10 min-w-[120px]">
                  <button onClick={borrarNota} className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50">Eliminar</button>
                </div>
              )}
            </div>
          </div>
          <button onClick={guardarCambios} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">Save</button>
        </div>

        {/* Textarea */}
        <div className={`${nota.color} rounded-xl p-6 mb-8`}>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escribe tu nota..."
            className="w-full bg-transparent resize-none outline-none min-h-[150px] text-gray-800 text-lg"
          />
        </div>

        {/* Campos */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <InputField label="Tags" icono={Tag}>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="UX, Design, Tech"
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
          </InputField>

          <div>
            <label className="block text-sm text-gray-500 mb-2 invisible">.</label>
            <Toggle activo={archivada} onChange={() => setArchivada(!archivada)} icono={Archive} texto="Archived" />
          </div>

          <InputField label="Category" icono={Folder}>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="flex-1 bg-transparent outline-none text-gray-700 cursor-pointer">
              <option value="">Seleccionar...</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Ideas">Ideas</option>
              <option value="Projects">Projects</option>
            </select>
          </InputField>

          <div>
            <label className="block text-sm text-gray-500 mb-2 invisible">.</label>
            <Toggle activo={importante} onChange={() => setImportante(!importante)} icono={Star} texto="Favorite" />
          </div>

          <InputField label="Date" icono={Calendar}>
            <span className="text-gray-700">{formatearFecha(nota.createdAt)}</span>
          </InputField>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
