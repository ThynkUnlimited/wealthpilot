import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {

  const getInitialTheme = () => {

    const saved = localStorage.getItem("theme")

    if (saved) return saved

    if (

      window.matchMedia(

        "(prefers-color-scheme: dark)"

      ).matches

    ) {

      return "dark"

    }

    return "light"

  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {

    document.documentElement.classList.remove(

      "light",

      "dark"

    )

    document.documentElement.classList.add(theme)

    localStorage.setItem("theme", theme)

  }, [theme])

  const toggleTheme = () => {

    setTheme(prev =>

      prev === "light"

        ? "dark"

        : "light"

    )

  }

  return (

    <ThemeContext.Provider

      value={{

        theme,

        toggleTheme,

      }}

    >

      {children}

    </ThemeContext.Provider>

  )

}

export function useTheme() {

  return useContext(ThemeContext)

}