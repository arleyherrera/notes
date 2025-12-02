import { useState, useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { ColorPicker } from '../common'

interface SidebarProps {
  onNuevaNota: (color: string) => void
}

function Sidebar({ onNuevaNota }: SidebarProps) {
  const [mostrarColores, setMostrarColores] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickFuera = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setMostrarColores(false)
      }
    }

    if (mostrarColores) {
      document.addEventListener('mousedown', handleClickFuera)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickFuera)
    }
  }, [mostrarColores])

  const crearNota = (color: string) => {
    onNuevaNota(color)
    setMostrarColores(false)
  }

  return (
    <div className="w-28 bg-white min-h-screen flex flex-col items-center py-6 border-r border-gray-200">
      {/* Logo */}
      <div className="text-sm font-semibold text-gray-700">Docket</div>

      {/* Espaciador */}
      <div className="mt-16" />

      {/* Boton agregar */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setMostrarColores(!mostrarColores)}
          className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>

        {mostrarColores && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
            <ColorPicker onSeleccionar={crearNota} vertical />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
