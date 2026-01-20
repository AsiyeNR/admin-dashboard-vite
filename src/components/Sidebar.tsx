import { useLocation, useNavigate } from "react-router-dom"

type SidebarProps = {
  collapsed?: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {

  const location = useLocation()
  const navigate = useNavigate()

  const menu = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Users", path: "/users", icon: "👥" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ]

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col p-4 h-full">

      {/* Logo */}
      <div className="text-xl font-bold mb-8 flex justify-center">
        {collapsed ? "A" : "AdminPanel"}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">

        {menu.map((item) => {
          const active = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"}
              `}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </button>
          )
        })}

      </nav>

    </div>
  )
}
