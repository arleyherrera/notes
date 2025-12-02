import { LucideIcon } from 'lucide-react'

interface ToggleProps {
  activo: boolean
  onChange: () => void
  icono: LucideIcon
  texto: string
}

function Toggle({ activo, onChange, icono: Icono, texto }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icono className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700">{texto}</span>
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition-colors ${activo ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${activo ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

export default Toggle
