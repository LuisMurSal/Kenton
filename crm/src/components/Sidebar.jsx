import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogOut, Users, Box, LayoutDashboard, Send, Menu, X } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const [active, setActive] = useState(location.pathname)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const linkStyle = (path) =>
    `flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
      active === path
        ? 'bg-green-700 text-white'
        : 'text-gray-700 hover:bg-green-100 hover:text-green-800'
    }`

  return (
    <>
    {/* Boton hamburguesa */}
        <button
          onClick={() => setIsOpen(true)}
          className={`
            md:hidden fixed top-4 left-4 z-50 bg-green-600 p-2 rounded text-white
            transition-opacity duration-300
            ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <Menu />
        </button>


      {/* Sidebar completo */}
      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:static top-0 left-0 w-64 h-screen bg-[#4f772d] shadow-md p-4
          transition-transform duration-300 z-40 md:translate-x-0
        `}
      >
        {/* Boton cerrar solo en movil */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)} className="text-green-900">
            <X />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#dad7cd] mb-8 text-center">CRM Panel</h1>

        <nav className="space-y-2">
          <Link to="/" className={linkStyle('/')} onClick={() => setIsOpen(false)}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/clientes" className={linkStyle('/clientes')} onClick={() => setIsOpen(false)}>
            <Users className="w-5 h-5" />
            <span>Clientes</span>
          </Link>
          <Link to="/productos" className={linkStyle('/productos')} onClick={() => setIsOpen(false)}>
            <Box className="w-5 h-5" />
            <span>Productos</span>
          </Link>
          <Link to="/asignar" className={linkStyle('/asignar')} onClick={() => setIsOpen(false)}>
            <Send className="w-5 h-5" />
            <span>Asignar</span>
          </Link>
        </nav>

        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#31572c] text-white rounded hover:bg-[#294b25] transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>
    </>
  )
}
