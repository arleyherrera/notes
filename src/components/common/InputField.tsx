import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface InputFieldProps {
  label?: string
  icon: LucideIcon
  children: ReactNode
}

function InputField({ label, icon: Icon, children }: InputFieldProps) {
  return (
    <div>
      {label && <label className="block text-sm text-gray-500 mb-2">{label}</label>}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Icon className="w-5 h-5 text-gray-400" />
        {children}
      </div>
    </div>
  )
}

export default InputField
