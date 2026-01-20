import React from "react"
import ReactDOM from "react-dom/client"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter } from "react-router-dom"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>
)
