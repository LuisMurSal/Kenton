import { useState, useEffect } from 'react'

export default function App() {
  const token = sessionStorage.getItem('token')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-gray/10 z-30 md:hidden transition-opacity duration-300"
        />
      )}

      <div
        className={`min-h-screen bg-gray-100 p-4 transition-all duration-300`}
        style={{
          marginLeft: windowWidth >= 768 ? `${sidebarWidth}px` : '0px',
        }}
      >
        <Outlet />
      </div>
    </>
  )
}
