import { useEffect, useState } from 'react'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({ nombre: '', email: '', productos: [] })
  const [editIndex, setEditIndex] = useState(null)
  const [productosDisponibles, setProductosDisponibles] = useState([])

  // Cargar clientes y productos desde localStorage
  useEffect(() => {
    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || []
    const storedProductos = JSON.parse(localStorage.getItem('productos')) || []
    setClientes(storedClientes)
    setProductosDisponibles(storedProductos)
  }, [])

  // Guardar en localStorage al cambiar clientes
  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes))
  }, [clientes])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editIndex !== null) {
      const updated = [...clientes]
      updated[editIndex] = form
      setClientes(updated)
      setEditIndex(null)
    } else {
      setClientes([...clientes, form])
    }
    setForm({ nombre: '', email: '', productos: [] })
  }

  const handleDelete = (index) => {
    const updated = clientes.filter((_, i) => i !== index)
    setClientes(updated)
  }

  const handleEdit = (index) => {
    setForm(clientes[index])
    setEditIndex(index)
  }

  const toggleProducto = (id) => {
    const isSelected = form.productos.includes(id)
    const updatedProductos = isSelected
      ? form.productos.filter(pid => pid !== id)
      : [...form.productos, id]
    setForm({ ...form, productos: updatedProductos })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#4f772d]">Clientes</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div>
          <h2 className="font-semibold mb-2">Asignar Productos</h2>
          <div className="grid grid-cols-2 gap-2">
            {productosDisponibles.map((producto) => (
              <label key={producto.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.productos.includes(producto.id)}
                  onChange={() => toggleProducto(producto.id)}
                />
                <span>{producto.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="bg-[#4f772d] text-white px-4 py-2 rounded hover:bg-[#3d5a1f]">
          {editIndex !== null ? 'Actualizar Cliente' : 'Agregar Cliente'}
        </button>
      </form>

      <div className="grid gap-4">
        {clientes.map((cliente, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{cliente.nombre}</h3>
                <p className="text-sm text-gray-600">{cliente.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(index)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            {cliente.productos.length > 0 && (
              <div className="text-sm text-gray-800">
                <strong>Productos:</strong>{' '}
                {cliente.productos.map(
                  pid => productosDisponibles.find(p => p.id === pid)?.nombre || 'Producto eliminado'
                ).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
