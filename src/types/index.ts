export interface Note {
  id: string
  content: string
  color: string
  createdAt: string
  updatedAt: string
  category: string
  tags: string[]
  pinned: boolean
  favorite: boolean
  archived?: boolean
}
