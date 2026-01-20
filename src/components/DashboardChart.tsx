import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Desktop collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static z-30
          h-full
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        <Navbar
          onMenuClick={() => {
            // Mobile open
            setSidebarOpen(true)

            // Desktop collapse toggle
            setSidebarCollapsed(!sidebarCollapsed)
          }}
        />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  )
}
