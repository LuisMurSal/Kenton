import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import './styles/pdfUtils.css' 
import Sidebar from './components/Sidebar'

export default function App() {
  const token = sessionStorage.getItem('token')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (!token) return <Navigate to="/login" />

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-gray/10 z-30 md:hidden transition-opacity duration-300"
        />
      )}

      <main
        className={`flex-1 bg-gray-100 p-4 transition-all duration-300 
                    ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}
      >
        <Outlet />
      </main>
    </div>
  )
}
