import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SidebarEdit() {
  const navigate = useNavigate()

  return (
    <div className="w-28 bg-white min-h-screen flex flex-col items-center py-6 border-r border-gray-200">
      <div className="text-sm font-semibold text-gray-700 mb-8">Docket</div>

      <button
        onClick={() => navigate('/')}
        className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}

export default SidebarEdit
