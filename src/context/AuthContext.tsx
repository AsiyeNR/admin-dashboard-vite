import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuth: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuth, setIsAuth] = useState<boolean>(false)

  // Load auth state from storage
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth === "true") {
      setIsAuth(true)
    }
  }, [])

  const login = () => {
    setIsAuth(true)
    localStorage.setItem("auth", "true")
  }

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}
