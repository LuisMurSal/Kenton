import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { supabase } from '../services/supabase' // importa tu cliente supabase

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Cambiar a false cuando quieras usar Supabase Auth
  const USE_DUMMY_AUTH = true

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (USE_DUMMY_AUTH) {
      // Login manual temporal
      if (email === 'admin@admin.com' && password === '123456') {
        sessionStorage.setItem('token', 'token-falso')
        navigate('/')
      } else {
        setError('Correo o contraseña incorrectos')
      }
    } else {
      // Login con Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError(error.message)
      } else {
        sessionStorage.setItem('token', data.session.access_token)
        navigate('/')
      }
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-[#4f772d]">
      {/* Contenedor de login */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl mb-6 text-center text-gray-800 font-semibold">
            Iniciar sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input correo con ícono */}
            <div className="flex items-center border-b-2 border-gray-400 focus-within:border-[#31572c]">
              <Mail className="text-gray-600 mr-2" size={20} />
              <input
                id="email"
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                className="w-full bg-transparent border-none focus:outline-none py-2 placeholder-gray-600"
              />
            </div>

            {/* Input contraseña con ícono */}
            <div className="flex items-center border-b-2 border-gray-400 focus-within:border-[#31572c]">
              <Lock className="text-gray-600 mr-2" size={20} />
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className="w-full bg-transparent border-none focus:outline-none py-2 placeholder-gray-600"
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
      <footer className="text-center p-4 text-[#3a5a40] bg-white">
        © 2025 Proyecto CRM
      </footer>
    </div>
  )
}
