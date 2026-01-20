import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load auth from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem("auth", "true")
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
