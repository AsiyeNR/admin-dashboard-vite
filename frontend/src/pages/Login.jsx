import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Fill all fields")
      return
    }

    setLoading(true)

    try {

      const res = await api.post("/api/auth/login", {
        email,
        password
      })

      // SAVE TOKENS
      login(res.data.accessToken, res.data.refreshToken)

      // HARD REDIRECT (SAFE)
      window.location.href = "/admin"

    } catch (err) {

      console.log(err)
      alert("Login failed")

    }

    setLoading(false)
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
          background: "#1e293b",
          padding: "40px",
          borderRadius: "12px",
          width: "320px",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}
      >

        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "6px",
            border: "none"
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
            marginTop: "15px",
            borderRadius: "6px",
            border: "none"
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          {loading ? "Logging in..." : "Login"}

        </button>

      </div>

    </div>
  )
}
