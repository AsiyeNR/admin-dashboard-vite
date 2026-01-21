import AdminLayout from "../layouts/AdminLayout"
import { Outlet } from "react-router-dom"

export default function Admin() {

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
