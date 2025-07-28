import { useNavigate } from 'react-router-dom'
import { Users, User, Box, Send } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#4f772d]">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Usuarios" link="/usuarios" description="Gestiona los usuarios del sistema" icon={<Users size={20} />} />
        <Card title="Clientes" link="/clientes" description="Visualiza, agrega o edita clientes" icon={<User size={20} />} />
        <Card title="Productos" link="/productos" description="Administra tu inventario de productos" icon={<Box size={20} />} />
        <Card title="Enviar PDF" link="/pdf" description="Genera y envía productos en PDF por email" icon={<Send size={20} />} />

        {/* Repetidos solo para ejemplo visual */}
        <Card title="Usuarios" link="/usuarios" description="Gestiona los usuarios del sistema" icon={<Users size={20} />} />
        <Card title="Clientes" link="/clientes" description="Visualiza, agrega o edita clientes" icon={<User size={20} />} />
        <Card title="Productos" link="/productos" description="Administra tu inventario de productos" icon={<Box size={20} />} />
        <Card title="Enviar PDF" link="/pdf" description="Genera y envía productos en PDF por email" icon={<Send size={20} />} />
      </div>
    </div>
  )
}

function Card({ title, link, description, icon }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    navigate(link)
  }

  return (
    <a
      href={link}
      onClick={handleClick}
      className="block p-6 rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition duration-200 border-gray-200 border bg-white cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-gray-500">{icon}</div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  )
}
