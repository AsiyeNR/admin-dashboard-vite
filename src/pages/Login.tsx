import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {

    if (email === "admin@mail.com" && password === "123456") {
      login()
      navigate("/")
    } else {
      alert("Invalid email or password")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
          Admin Panel Login
        </h2>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-slate-700 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-slate-700 dark:text-white"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  )
}
