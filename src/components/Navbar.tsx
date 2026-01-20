import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

type NavbarProps = {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {

  const { toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden px-2 py-1 rounded bg-slate-200 dark:bg-slate-700"
          >
            ☰
          </button>
        )}

        <h2 className="font-semibold text-slate-800 dark:text-white">
          Dashboard
        </h2>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
        >
          🌙
        </button>

        {/* Profile */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
        >
          <span className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white">
            A
          </span>
          <span className="hidden sm:block">Admin</span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg overflow-hidden">

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  )
}
