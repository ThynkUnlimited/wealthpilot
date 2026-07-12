import { Bell, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">

      <div className="flex items-center justify-between px-6 h-16">

        <div>

          <h2 className="text-lg font-semibold">
            Welcome Back 👋
          </h2>

          <p className="text-sm text-slate-500">
            Manage your money wisely.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

            <Search size={18} />

          </button>

          <button className="relative h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

            <Bell size={18} />

            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>

          </button>

        </div>

      </div>

    </header>
  )
}