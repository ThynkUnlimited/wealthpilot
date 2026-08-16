import { NavLink } from "react-router-dom"

import navigation from "../../data/navigation"

export default function Sidebar() {

  return (

    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">

      {/* =====================================
          LOGO
      ===================================== */}

      <div className="border-b border-slate-200 p-7 dark:border-slate-800">

        <h1 className="text-3xl font-bold tracking-tight text-blue-600">
          WealthPilot
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Smart Personal Finance
        </p>

      </div>


      {/* =====================================
          NAVIGATION
      ===================================== */}

      <nav className="flex-1 space-y-2 p-5">

        {navigation.map((item) => {

          const Icon = item.icon

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >

              {/* ICON */}

              <span className="flex h-5 w-5 shrink-0 items-center justify-center">

                {typeof Icon === "string" ? (

                  <span
                    className="text-lg leading-none"
                    aria-hidden="true"
                  >
                    {Icon}
                  </span>

                ) : (

                  <Icon
                    size={20}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />

                )}

              </span>


              {/* LABEL */}

              <span>
                {item.name}
              </span>

            </NavLink>

          )

        })}

      </nav>


      {/* =====================================
          FOOTER
      ===================================== */}

      <div className="border-t border-slate-200 p-6 dark:border-slate-800">

        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

          <p className="text-center text-sm font-semibold">
            WealthPilot
          </p>

          <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
            Version 1.0.0
          </p>

        </div>

      </div>

    </aside>

  )

}