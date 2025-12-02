import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface InputFieldProps {
  label?: string
  icono: LucideIcon
  children: ReactNode
}

function InputField({ label, icono: Icono, children }: InputFieldProps) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-500 mb-2">{label}</label>}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Icono className="w-5 h-5 text-gray-400" />
        {children}
      </div>
    </div>
  )
}

export default InputField
