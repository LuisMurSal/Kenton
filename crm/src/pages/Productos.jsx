import { useState } from 'react'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', imagen: '' })
  const [editando, setEditando] = useState(null)

  const handleInput = (e) => {
    const { name, value } = e.target
    setNuevo({ ...nuevo, [name]: value })
  }

  const agregarProducto = () => {
    if (!nuevo.nombre || !nuevo.precio) return
    setProductos([...productos, { ...nuevo, id: Date.now() }])
    setNuevo({ nombre: '', descripcion: '', precio: '', imagen: '' })
  }

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const editarProducto = (producto) => {
    setNuevo(producto)
    setEditando(producto.id)
  }

  const guardarEdicion = () => {
    setProductos(productos.map(p => p.id === editando ? { ...nuevo, id: editando } : p))
    setEditando(null)
    setNuevo({ nombre: '', descripcion: '', precio: '', imagen: '' })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>

      {/* Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          name="nombre"
          value={nuevo.nombre}
          onChange={handleInput}
          placeholder="Nombre"
          className="border rounded px-3 py-2"
        />
        <input
          name="descripcion"
          value={nuevo.descripcion}
          onChange={handleInput}
          placeholder="Descripción"
          className="border rounded px-3 py-2"
        />
        <input
          name="precio"
          type="number"
          value={nuevo.precio}
          onChange={handleInput}
          placeholder="Precio"
          className="border rounded px-3 py-2"
        />
        <input
          name="imagen"
          value={nuevo.imagen}
          onChange={handleInput}
          placeholder="URL de la imagen"
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={editando ? guardarEdicion : agregarProducto}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-8"
      >
        {editando ? 'Guardar Cambios' : 'Agregar Producto'}
      </button>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg shadow p-4 bg-white relative">
            <img
              src={producto.imagen || 'https://via.placeholder.com/150'}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-green-700 font-semibold mt-2">${producto.precio}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => editarProducto(producto)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProducto(producto.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
