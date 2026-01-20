import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

type NavbarProps = {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {

  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="h-14 bg-white dark:bg-slate-800 flex items-center justify-between px-4 shadow">

      {/* Left */}
      <button
        onClick={onMenuClick}
        className="text-xl"
      >
        ☰
      </button>

      {/* Right */}
      <button
        onClick={() => {
          logout()
          navigate("/login")
        }}
        className="text-red-500 hover:text-red-600 font-medium"
      >
        Logout
      </button>

    </div>
  )
}
