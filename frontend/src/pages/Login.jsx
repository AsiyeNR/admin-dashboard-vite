import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // NORMAL LOGIN
  const handleLogin = async () => {
    try {

      const res = await api.post("/api/auth/login", {
        email,
        password
      })

      login(res.data.accessToken, res.data.refreshToken)

      navigate("/admin/dashboard")

    } catch {
      alert("Login failed")
    }
  }

  // DEMO LOGIN
  const handleDemoLogin = async () => {
    try {

      const res = await api.post("/api/auth/login", {
        email: "admin@test.com",
        password: "123456"
      })

      login(res.data.accessToken, res.data.refreshToken)

      navigate("/admin/dashboard")

    } catch {
      alert("Demo login failed")
    }
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a"
      }}
    >

      <div
        style={{
          background: "#111827",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          color: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}
      >

        {/* DEMO BADGE */}
        <div
          style={{
            background: "#1f2937",
            color: "#4fc3f7",
            padding: "6px 12px",
            borderRadius: "8px",
            display: "inline-block",
            marginBottom: "12px",
            fontWeight: "bold",
            fontSize: "12px"
          }}
        >
          DEMO MODE ENABLED
        </div>

        <h2 style={{ marginBottom: "20px" }}>
          Admin Login
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "none",
            outline: "none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "none",
            outline: "none"
          }}
        />

        {/* NORMAL LOGIN */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4fc3f7",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        {/* DEMO LOGIN */}
        <button
          onClick={handleDemoLogin}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            background: "#ff9800",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🚀 Demo Login (Instant Access)
        </button>

      </div>

    </div>
  )
}

