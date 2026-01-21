import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./context/ThemeContext"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Settings from "./pages/Settings"

import AdminLayout from "./layouts/AdminLayout"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <AuthProvider>
         <ThemeProvider>
        <Routes>

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* ADMIN PROTECTED */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* DEFAULT */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
          </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
