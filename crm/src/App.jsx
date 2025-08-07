import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'

export default function App() {
  const token = sessionStorage.getItem('token')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // <--- estado para abrir/cerrar el sidebar en móvil

  if (!token) return <Navigate to="/login" />

  const sidebarWidth = isCollapsed ? 80 : 256

  return (
    <>
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Overlay al abrir el sidebar en móviles */}
      {isOpen && (
        <div
  onClick={() => setIsOpen(false)}
  className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md z-30 md:hidden transition-opacity duration-300"
/>

      )}

      <div
        className={`min-h-screen bg-gray-100 p-4 transition-all duration-300`}
        style={{
          marginLeft: window.innerWidth >= 768 ? `${sidebarWidth}px` : '0px',
        }}
      >
        <Outlet />
      </div>
    </>
  )
}
