import { memo } from 'react'

interface EmptyStateProps {
  message: string
}

const EmptyState = memo(function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center text-gray-500 py-10">
      {message}
    </div>
  )
})

export default EmptyState
