// Funciones para guardar y cargar notas del localStorage

const STORAGE_KEY = 'mis-notas'

export function guardarNotas(notas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas))
  } catch (error) {
    console.error('Error guardando notas:', error)
  }
}

export function cargarNotas() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY)
    if (datos) {
      return JSON.parse(datos)
    }
    return []
  } catch (error) {
    console.error('Error cargando notas:', error)
    return []
  }
}
