export interface Nota {
  id: string
  contenido: string
  color: string
  createdAt: string
  updatedAt: string
  categoria: string
  tags: string[]
  fijada: boolean
  importante: boolean
  archivada?: boolean
}
