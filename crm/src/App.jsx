import { Outlet, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import Sidebar from '../src/components/Sidebar' 

export default function App() {
  const token = localStorage.getItem('token')
  const [menuOpen, setMenuOpen] = useState(false)

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar solo visible en pantallas md y mayores */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  )
}
