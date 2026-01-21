import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("dark")

  // LOAD SAVED THEME
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.setAttribute("data-theme", savedTheme)
    }
  }, [])

  const toggleTheme = () => {

    const newTheme = theme === "dark" ? "light" : "dark"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    document.body.setAttribute("data-theme", newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
