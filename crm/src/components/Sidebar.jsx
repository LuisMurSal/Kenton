import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogOut, Users, Box, LayoutDashboard, Menu, X, ChevronLeft, ChevronRight, Snail, UserPlus } from 'lucide-react'

export default function Sidebar({ isCollapsed, setIsCollapsed, isOpen, setIsOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(location.pathname)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const linkStyle = (path) =>
    `${active === path ? 'bg-gray-50 text-[#4f772d]' : 'text-white hover:bg-gray-50 hover:text-[#4f772d]'}
     flex items-center px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
     ${!isMobile && isCollapsed ? 'justify-center' : 'space-x-3 justify-start'}`

  return (
    <>
      {/* Botón Hamburguesa (solo en mobile) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50 bg-[#4f772d] p-2 rounded text-white"
        >
          <Menu />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#4f772d] shadow-md p-4 z-40
          transition-all duration-300 ease-in-out
          ${!isMobile ? (isCollapsed ? 'w-20' : 'w-64') : 'w-64'}
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          flex flex-col justify-between
        `}
      >
        <div>
          {/* Botón cerrar (solo mobile) */}
          {isMobile && (
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsOpen(false)} className="text-green-100">
                <X />
              </button>
            </div>
          )}

          {/* Logo */}
          <div className={`${isMobile ? 'flex flex-col items-center mb-6 w-full' : 'hidden md:flex items-center justify-between mb-8'}`}>
            <Snail className="w-6 h-6 text-white mb-1" />
            {!isMobile && !isCollapsed && <h1 className="text-white font-bold text-2xl">CRM Panel</h1>}
            {isMobile && <h1 className="text-white font-bold text-xl">CRM Panel</h1>}
          </div>

          {/* Desktop colapsar */}
          {!isMobile && (
            <div className="hidden md:flex justify-end mb-8">
              {isCollapsed ? (
                <button onClick={() => setIsCollapsed(false)} className="text-green-100 hover:text-white mx-auto">
                  <ChevronRight className="w-6 h-6 transition-transform duration-300" />
                </button>
              ) : (
                <button onClick={() => setIsCollapsed(true)} className="text-green-100 hover:text-white">
                  <ChevronLeft className="w-6 h-6 transition-transform duration-300" />
                </button>
              )}
            </div>
          )}

          {/* Enlaces */}
          <nav className="space-y-2">
            <Link to="/" className={linkStyle('/')} onClick={() => isMobile && setIsOpen(false)}>
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
            </Link>
            <Link to="/clientes" className={linkStyle('/clientes')} onClick={() => isMobile && setIsOpen(false)}>
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Clientes</span>}
            </Link>
            <Link to="/agregar-cliente" className={linkStyle('/agregar-cliente')} onClick={() => isMobile && setIsOpen(false)}>
              <UserPlus className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Agregar Cliente</span>}
            </Link>
            <Link to="/productos" className={linkStyle('/productos')} onClick={() => isMobile && setIsOpen(false)}>
              <Box className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">Productos</span>}
            </Link>
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-2 px-4 py-2 bg-[#31572c] text-white rounded-xl
              hover:bg-[#294b25] transition justify-center cursor-pointer
            `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="transition-opacity duration-300">Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
