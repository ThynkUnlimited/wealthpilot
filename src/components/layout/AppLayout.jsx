import Header from "./Header"
import BottomNav from "./BottomNav"
import Sidebar from "./Sidebar"

export default function AppLayout({ children }) {

  return (

    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">

      {/* Desktop Layout */}

      <div className="hidden lg:flex">

        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">

          <Header />

          <main className="flex-1 p-6">

            {children}

          </main>

        </div>

      </div>

      {/* Mobile Layout */}

      <div className="flex min-h-screen flex-col lg:hidden">

        <Header />

        <main className="flex-1 px-4 pt-4 pb-24">

          {children}

        </main>

        <BottomNav />

      </div>

    </div>

  )

}