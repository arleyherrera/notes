import { memo } from 'react'

interface NotFoundProps {
  message: string
  actionText: string
  onAction: () => void
}

const NotFound = memo(function NotFound({ message, actionText, onAction }: NotFoundProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-gray-500 mb-4">{message}</p>
        <button onClick={onAction} className="text-blue-500 hover:underline">
          {actionText}
        </button>
      </div>
    </div>
  )
})

export default NotFound
