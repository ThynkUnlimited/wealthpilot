import { NavLink } from "react-router-dom"
import navigation from "../../data/navigation"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold text-blue-600">
          WealthPilot
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Personal Finance
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {navigation.map((item) => {

          const Icon = item.icon

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }
                `
              }
            >

              <Icon size={18} />

              <span className="text-sm font-medium">
                {item.name}
              </span>

            </NavLink>

          )

        })}

      </nav>

      {/* Footer */}

      <div className="border-t p-4">

        <p className="text-xs text-slate-400 text-center">
          WealthPilot v1.0
        </p>

      </div>

    </aside>
  )
}