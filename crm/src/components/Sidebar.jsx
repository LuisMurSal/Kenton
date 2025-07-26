import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  LogOut,
  Users,
  Box,
  LayoutDashboard,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Snail
} from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const [active, setActive] = useState(location.pathname)
  const [isOpen, setIsOpen] = useState(false)         // para móvil
  const [isCollapsed, setIsCollapsed] = useState(false) // para escritorio

  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const linkStyle = (path) =>
    `${active === path ? 'bg-gray-50 text-[#4f772d]' : 'text-white hover:bg-gray-50 hover:text-[#4f772d]'}
        flex items-center px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
        ${isCollapsed ? 'justify-center' : 'space-x-3 justify-start'}`


  return (
    <>
      {/* Botón hamburguesa - móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          md:hidden fixed top-4 left-4 z-50 bg-[#4f772d] p-2 rounded text-white
          transition-opacity duration-300
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
  className={`
    fixed md:relative top-0 left-0 h-screen bg-[#4f772d] shadow-md p-4 z-40
    transition-all duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
    ${isCollapsed ? 'w-20' : 'w-64'}
  `}
  style={{ flexShrink: 0 }}
>


        {/* Botón cerrar - móvil */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)} className="text-green-100">
            <X />
          </button>
        </div>

        {/* Título y botón colapsar */}
<div className="hidden md:flex items-center justify-between mb-8">
  {isCollapsed ? (
    <button
      onClick={() => setIsCollapsed(false)}
      className="text-green-100 hover:text-white mx-auto"
    >
      <ChevronRight className="w-6 h-6 transition-transform duration-300" />
    </button>
  ) : (
    <>
      <div className="flex items-center space-x-2 mx-auto">
        <Snail className="w-6 h-6 text-[#dad7cd]" />
        <h1 className="text-[#dad7cd] font-bold text-2xl">CRM Panel</h1>
      </div>
      <button
        onClick={() => setIsCollapsed(true)}
        className="text-green-100 hover:text-white"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-300" />
      </button>
    </>
  )}
</div>


        {/* Navegación */}
        <nav className="space-y-2">
            <Link to="/" className={linkStyle('/')} onClick={() => setIsOpen(false)}>
                <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
            </Link>
            <Link to="/clientes" className={linkStyle('/clientes')} onClick={() => setIsOpen(false)}>
                <Users className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">Clientes</span>}
            </Link>
            <Link to="/productos" className={linkStyle('/productos')} onClick={() => setIsOpen(false)}>
                <Box className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">Productos</span>}
            </Link>
        </nav>

        {/* Logout */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-2 px-4 py-2 bg-[#31572c] text-white rounded-xl
              hover:bg-[#294b25] transition justify-center
            `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="transition-opacity duration-300">Cerrar sesión</span>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
