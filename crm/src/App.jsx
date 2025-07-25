import { Outlet, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import './index.css'

export default function App() {
  const token = localStorage.getItem('token')
  const [menuOpen, setMenuOpen] = useState(false)

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <>
      <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">CRM</Link>
        </div>

        {/* Boton hamburguesa */}
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* menu */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul className="md:flex md:space-x-6 mt-4 md:mt-0">
            <li>
              <Link to="/" className="block py-2 md:py-0 hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/clientes" className="block py-2 md:py-0 hover:underline">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/productos" className="block py-2 md:py-0 hover:underline">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/asignar" className="block py-2 md:py-0 hover:underline">
                Asignar
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 md:py-0 hover:underline text-red-200"
              >
                Cerrar sesion
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}
