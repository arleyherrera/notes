import NoteCard from './NoteCard'

function NoteGrid({ notas, onActualizar }) {

  const notasOrdenadas = [...notas].sort((a, b) => {
    if (a.fijada && !b.fijada) return -1
    if (!a.fijada && b.fijada) return 1
    return 0
  })

  if (notas.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No hay notas. ¡Crea una nueva!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {notasOrdenadas.map((nota) => (
        <NoteCard
          key={nota.id}
          nota={nota}
          onActualizar={onActualizar}
        />
      ))}
    </div>
  )
}

export default NoteGrid
