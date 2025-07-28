import { useEffect, useState } from 'react'
import { Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'  // <-- Importa useNavigate

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({ nombre: '', email: '', productos: [] })
  const [editIndex, setEditIndex] = useState(null)
  const [productosDisponibles, setProductosDisponibles] = useState([])

  const navigate = useNavigate()  // <-- Inicializa navigate

  useEffect(() => {
    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || []
    const storedProductos = JSON.parse(localStorage.getItem('productos')) || []
    setClientes(storedClientes)
    setProductosDisponibles(storedProductos)
  }, [])

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

  const irAlCatalogo = () => {
    navigate('/productos')  // Navega sin recargar
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-[#4f772d]">Clientes</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-xl shadow">
        {/* Campos y botones igual */}
        <div className="flex items-center gap-2 border rounded border-gray-200 shadow bg-white px-2">
          <User className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 bg-transparent focus:outline-none"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center gap-2 border rounded border-gray-200 shadow bg-white px-2">
          <Mail className="text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-transparent focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">Asignar Productos</h2>
          <div className="flex flex-wrap gap-2">
            {productosDisponibles.map((producto) => {
              const isSelected = form.productos.includes(producto.id)
              return (
                <button
                  type="button"
                  key={producto.id}
                  onClick={() => toggleProducto(producto.id)}
                  className={`px-3 py-1 rounded border transition text-sm font-medium
                    ${isSelected 
                      ? 'bg-green-600 text-white border-green-700' 
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 cursor-pointer'}
                  `}
                >
                  {producto.nombre}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#4f772d] text-white px-4 py-2 rounded hover:bg-[#3d5a1f] cursor-pointer"
          >
            {editIndex !== null ? 'Actualizar Cliente' : 'Agregar Cliente'}
          </button>
          <button
            type="button"
            onClick={irAlCatalogo}
            className="bg-[#31572c] text-white px-4 py-2 rounded hover:bg-[#2a4b26] cursor-pointer"
          >
            Catálogo de Productos
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {clientes.map((cliente, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{cliente.nombre}</h3>
                <p className="text-sm text-gray-600">{cliente.email}</p>
              </div>
              <div className="space-x-2 flex">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 text-sm bg-[#4f772d] text-white rounded hover:bg-[#3d5a1f] transition cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 text-sm bg-[#31572c] text-white rounded hover:bg-red-700 transition cursor-pointer"
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
