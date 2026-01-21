import { ThemeContext } from "../context/ThemeContext"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, NavLink, Outlet } from "react-router-dom"


export default function AdminLayout() {

  const { logout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  useEffect(() => {
  if (sidebarOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  return () => {
    document.body.style.overflow = "auto"
  }
}, [sidebarOpen])

  const [isMobile, setIsMobile] = useState(false)

useEffect(() => {

  const handleResize = () => {

    if (window.innerWidth < 768) {
      setIsMobile(true)
      setSidebarOpen(false)
    } else {
      setIsMobile(false)
      setSidebarOpen(true)
    }

  }

  handleResize()

  window.addEventListener("resize", handleResize)

  return () => window.removeEventListener("resize", handleResize)

}, [])



  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#121212" }}>
{/* MOBILE OVERLAY */}
{isMobile && sidebarOpen && (
  <div
    onClick={() => {
  if (window.innerWidth < 768) {
    setSidebarOpen(false)
  }
}}

    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 900
    }}
  />
)}

      {/* SIDEBAR */}
      <aside
        style={{
          width: sidebarOpen ? "230px" : "70px",
          background: "#111",
          color: "#fff",
          padding: "20px",
          position: "fixed",
          height: "100%",
          left: 0,
          top: 0,
          transition: "0.3s ease",
          zIndex: 1000,
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}
      >

        {/* LOGO */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          ⚡ {sidebarOpen && "ADMIN PANEL"}
        </div>

        {/* DASHBOARD */}
        <NavLink
          to="/admin/dashboard"
          className="sidebar-item"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            textDecoration: "none",
            color: isActive ? "#4fc3f7" : "#fff",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >

          <span>📊</span>
          {sidebarOpen && <span>Dashboard</span>}
          {!sidebarOpen && <span className="tooltip">Dashboard</span>}

        </NavLink>

        {/* USERS */}
        <NavLink
          to="/admin/users"
          className="sidebar-item"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            textDecoration: "none",
            color: isActive ? "#4fc3f7" : "#fff",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >

          <span>👥</span>
          {sidebarOpen && <span>Users</span>}
          {!sidebarOpen && <span className="tooltip">Users</span>}

        </NavLink>

        {/* SETTINGS */}
        <NavLink
          to="/admin/settings"
          className="sidebar-item"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            borderRadius: "8px",
            textDecoration: "none",
            color: isActive ? "#4fc3f7" : "#fff",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >

          <span>⚙</span>
          {sidebarOpen && <span>Settings</span>}
          {!sidebarOpen && <span className="tooltip">Settings</span>}

        </NavLink>

      </aside>

      {/* MAIN AREA */}
      <main
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? "230px" : "70px",
          width: sidebarOpen
            ? "calc(100% - 230px)"
            : "calc(100% - 70px)",
          transition: "0.3s",
         
        }}
      >

        {/* TOPBAR */}
        <header
          style={{
            height: "60px",
            background: "#1f1f1f",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px"
          }}
        >

          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            style={{
              fontSize: "22px",
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            ☰
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "1px solid #4fc3f7",
                padding: "6px 12px",
                borderRadius: "6px",
                color: "#4fc3f7",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>

            <span>Admin Dashboard</span>

            <button
              onClick={handleLogout}
              style={{
                background: "#4fc3f7",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Logout
            </button>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <section
          style={{
            padding: "20px",
            animation: "fadeIn 0.4s ease",
            minHeight: "calc(100vh - 60px)",
            boxSizing: "border-box"
          }}
        >
          <Outlet />
        </section>

      </main>

    </div>
  )
}
