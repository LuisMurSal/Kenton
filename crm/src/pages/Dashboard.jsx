// src/pages/Dashboard.jsx
export default function Dashboard() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Usuarios" link="/usuarios" description="Gestiona los usuarios del sistema" />
          <Card title="Clientes" link="/clientes" description="Visualiza, agrega o edita clientes" />
          <Card title="Productos" link="/productos" description="Administra tu inventario de productos" />
          <Card title="Asignar productos" link="/asignar" description="Asigna productos a los clientes registrados" />
          <Card title="Enviar PDF" link="/pdf" description="Genera y envía productos en PDF por email" />
        </div>
      </div>
    )
  }
  
  function Card({ title, link, description }) {
    return (
      <a
        href={link}
        className="block p-6 border rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition duration-200"
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </a>
    )
  }
  