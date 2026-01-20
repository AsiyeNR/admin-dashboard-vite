import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    setError("")
    setLoading(true)

    setTimeout(() => {

      if (email === "admin@admin.com" && password === "123456") {
        login()
        navigate("/")
      } else {
        setError("Invalid credentials")
      }

      setLoading(false)

    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
          Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-xs text-center mt-4 text-slate-500">
          Demo: admin@admin.com | 123456
        </p>

      </form>

    </div>
  )
}
