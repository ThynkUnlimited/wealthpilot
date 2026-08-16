import {
  Bell,
  Search,
  Sun,
  Moon,
  Settings,
  LogOut,
} from "lucide-react"

import { Link, useNavigate } from "react-router-dom"

import { useState } from "react"

import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { useNotifications } from "../../context/NotificationContext"

export default function Header() {

  const { theme, toggleTheme } = useTheme()

  const { user, logout } = useAuth()

  const {

    notifications,

    markAsRead,

    clearNotifications,

  } = useNotifications()

  const navigate = useNavigate()

  const [openNotifications, setOpenNotifications] = useState(false)

  const handleLogout = async () => {

    await logout()

    navigate("/login")

  }

  /* -------------------------
      Greeting
  ------------------------- */

  const hour = new Date().getHours()

  let greeting = "Good Evening"

  if (hour < 12) {

    greeting = "Good Morning"

  } else if (hour < 18) {

    greeting = "Good Afternoon"

  }

  /* -------------------------
      User Name
  ------------------------- */

  const displayName =

    user?.displayName ||

    user?.email?.split("@")[0] ||

    "User"

  const initials = displayName

    .split(" ")

    .map(name => name[0])

    .join("")

    .substring(0, 2)

    .toUpperCase()

  const unread = notifications.filter(

    item => !item.read

  ).length

  return (

    <header className="border-b border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">

      <div className="flex h-16 items-center justify-between px-6">

        {/* Left */}

        <div>

          <h2 className="text-xl font-bold">

            {greeting}, {displayName} 👋

          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">

            Welcome to WealthPilot

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <button

            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"

          >

            <Search size={18} />

          </button>

          {/* Theme */}

          <button

            onClick={toggleTheme}

            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"

          >

            {

              theme === "dark"

                ? <Sun size={18} />

                : <Moon size={18} />

            }

          </button>

          {/* Notifications */}

          <div className="relative">

            <button

              onClick={() =>

                setOpenNotifications(

                  !openNotifications

                )

              }

              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"

            >

              <Bell size={18} />

              {

                unread > 0 && (

                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">

                    {unread}

                  </span>

                )

              }

            </button>

            {

              openNotifications && (

                <div className="absolute right-0 z-50 mt-3 w-96 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                  <div className="flex items-center justify-between border-b p-4">

                    <h3 className="font-semibold">

                      Notifications

                    </h3>

                    {

                      notifications.length > 0 && (

                        <button

                          onClick={clearNotifications}

                          className="text-xs text-blue-600"

                        >

                          Clear

                        </button>

                      )

                    }

                  </div>

                  <div className="max-h-96 overflow-y-auto">

                    {

                      notifications.length === 0 ? (

                        <div className="p-6 text-center text-sm text-slate-500">

                          No notifications

                        </div>

                      ) : (

                        notifications.map(item => (

                          <button

                            key={item.id}

                            onClick={() =>

                              markAsRead(item.id)

                            }

                            className={`w-full border-b p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800 ${

                              !item.read

                                ? "bg-blue-50 dark:bg-slate-800"

                                : ""

                            }`}

                          >

                            <p className="font-semibold">

                              {item.title}

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                              {item.message}

                            </p>

                            <p className="mt-2 text-xs text-slate-400">

                              {item.time}

                            </p>

                          </button>

                        ))

                      )

                    }

                  </div>

                </div>

              )

            }

          </div>

          {/* Settings */}

          <Link

            to="/settings"

            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"

          >

            <Settings size={18} />

          </Link>

          {/* Profile */}

          <div className="hidden items-center gap-3 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800 md:flex">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

              {initials}

            </div>

            <div>

              <p className="text-sm font-semibold">

                {displayName}

              </p>

              <p className="text-xs text-slate-500">

                {user?.email}

              </p>

            </div>

          </div>

          {/* Logout */}

          <button

            onClick={handleLogout}

            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"

          >

            <LogOut size={18} />

          </button>

        </div>

      </div>

    </header>

  )

}