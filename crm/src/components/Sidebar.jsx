import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={`h-screen bg-blue-700 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
        <span className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>CRM</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none text-white"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded hover:bg-blue-600">Dashboard</Link>
        <Link to="/clientes" className="block px-4 py-2 rounded hover:bg-blue-600">Clientes</Link>
        <Link to="/productos" className="block px-4 py-2 rounded hover:bg-blue-600">Productos</Link>
        <Link to="/asignar" className="block px-4 py-2 rounded hover:bg-blue-600">Asignar</Link>
      </nav>

      <div className="p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="w-full text-left text-red-200 hover:text-red-400"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
