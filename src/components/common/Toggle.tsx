import { LucideIcon } from 'lucide-react'

interface ToggleProps {
  active: boolean
  onChange: () => void
  icon: LucideIcon
  text: string
}

function Toggle({ active, onChange, icon: Icon, text }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700">{text}</span>
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition-colors ${active ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}

export default Toggle
