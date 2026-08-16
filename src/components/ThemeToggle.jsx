import { Moon, Sun } from "lucide-react"

import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {

  const { theme, toggleTheme } = useTheme()

  return (

    <button

      onClick={toggleTheme}

      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"

    >

      {theme === "dark"

        ? <Sun size={18} />

        : <Moon size={18} />

      }

      <span className="text-sm font-medium">

        {theme === "dark"

          ? "Light Mode"

          : "Dark Mode"}

      </span>

    </button>

  )

}