import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function PrivateRoute({ children }) {

  const { isAuth, loading } = useContext(AuthContext)

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}
