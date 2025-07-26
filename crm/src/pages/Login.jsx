import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === 'admin@admin.com' && password === '123456') {
      localStorage.setItem('token', 'token-falso')
      navigate('/')
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-[#4f772d]"
    >
      {/* Contenedor de login */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-[#dad7cd]">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Iniciar sesion</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete='off'
                className="w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-[#31572c] focus:outline-none py-2 placeholder-gray-600"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='off'
                className="w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-[#31572c] focus:outline-none py-2 placeholder-gray-600"
              />
            </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
    <button
      type="submit"
      className="w-full bg-[#4f772d] text-white py-2 rounded-4xl hover:bg-[#31572c] transition-colors cursor-pointer"
    >
      Ingresar
    </button>
  </form>
</div>

      </div>

      {/* Footer fijo al final */}
      <footer className="text-center p-4 text-[#3a5a40] bg-[#dad7cd]">
        © 2025 Poyecto CRM
      </footer>
    </div>
  )
}
