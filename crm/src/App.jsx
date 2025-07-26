import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import Sidebar from '../src/components/Sidebar'

export default function App() {
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to="/login" />

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}
