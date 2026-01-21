import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  // APP LOAD TOKEN CHECK
  useEffect(() => {

    const token = localStorage.getItem("accessToken")

    if (token) {
      setIsAuth(true)
    }

    setLoading(false)

  }, [])

  // LOGIN
  const login = (accessToken, refreshToken) => {

    console.log("LOGIN CONTEXT SET")

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)

    setIsAuth(true)
  }

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    setIsAuth(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
