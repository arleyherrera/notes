interface ColorPickerProps {
  onSeleccionar: (color: string) => void
  vertical?: boolean
}

const colores = [
  { nombre: 'Naranja', clase: 'bg-orange-300' },
  { nombre: 'Amarillo', clase: 'bg-yellow-300' },
  { nombre: 'Lima', clase: 'bg-lime-300' },
  { nombre: 'Rosa', clase: 'bg-pink-300' },
  { nombre: 'Cyan', clase: 'bg-cyan-300' },
  { nombre: 'Violeta', clase: 'bg-violet-300' },
]

function ColorPicker({ onSeleccionar, vertical }: ColorPickerProps) {
  return (
    <div className={`${vertical ? 'flex flex-col' : 'flex'} gap-2 p-2 bg-white rounded-lg shadow-lg`}>
      {colores.map((color) => (
        <button
          key={color.nombre}
          onClick={() => onSeleccionar(color.clase)}
          className={`w-8 h-8 rounded-full ${color.clase} hover:scale-110 transition-transform`}
          title={color.nombre}
        />
      ))}
    </div>
  )
}

export default ColorPicker
