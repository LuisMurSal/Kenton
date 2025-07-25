import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Clientes from './pages/Clientes.jsx'
import Productos from './pages/Productos.jsx'
import Asignar from './pages/Asignar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="productos" element={<Productos />} />
        <Route path="asignar" element={<Asignar />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
