import { Routes, Route } from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Settings from "../pages/Settings"
import Login from "../pages/Login"

import ProtectedRoute from "./ProtectedRoute"

export default function AppRoutes() {

  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

    </Routes>
  )
}
