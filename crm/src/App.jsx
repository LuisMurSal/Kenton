import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'

export default function App() {
  const token = localStorage.getItem('token')
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!token) return <Navigate to="/login" />

  const sidebarWidth = isCollapsed ? 80 : 256

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

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
