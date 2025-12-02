import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Pencil } from 'lucide-react'

function NoteCard({ nota, onActualizar }) {
  const [texto, setTexto] = useState(nota.contenido)
  const [hover, setHover] = useState(false)

  const guardarContenido = () => {
    if (texto !== nota.contenido) {
      onActualizar(nota.id, { contenido: texto })
    }
  }

  const toggleImportante = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onActualizar(nota.id, { importante: !nota.importante })
  }

  // Formatear fecha como en la imagen
  const formatearFecha = (fecha) => {
    const opciones = { month: 'short', day: 'numeric', year: 'numeric' }
    return new Date(fecha).toLocaleDateString('en-US', opciones)
  }

  return (
    <div
      className={`${nota.color} rounded-2xl p-5 min-h-[180px] relative flex flex-col animate-slide-in`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Estrella arriba a la derecha - solo si es importante */}
      {nota.importante && (
        <button
          onClick={toggleImportante}
          className="absolute top-3 right-3 p-1"
        >
          <Star className="w-5 h-5 fill-gray-700 text-gray-700" />
        </button>
      )}

      {/* Contenido */}
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onBlur={guardarContenido}
        placeholder="Escribe tu nota..."
        className="w-full bg-transparent resize-none outline-none flex-1 text-gray-800 font-medium leading-relaxed"
        style={{ minHeight: '100px' }}
      />

      {/* Footer con fecha y boton editar */}
      <div className="flex justify-between items-end mt-2">
        <span className="text-sm text-gray-600">
          {formatearFecha(nota.updatedAt)}
        </span>

        {/* Boton editar - siempre visible en hover */}
        {hover && (
          <Link
            to={`/notes/${nota.id}`}
            className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
          >
            <Pencil className="w-4 h-4 text-gray-700" />
          </Link>
        )}
      </div>

      {/* Boton para marcar importante (oculto, solo en hover si no es importante) */}
      {hover && !nota.importante && (
        <button
          onClick={toggleImportante}
          className="absolute top-3 right-3 p-1 opacity-50 hover:opacity-100"
        >
          <Star className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default NoteCard
