import Header from "./Header"
import BottomNav from "./BottomNav"
import Sidebar from "./Sidebar"

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Desktop Layout */}
      <div className="hidden lg:flex">

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Header />

          <main className="p-6">
            {children}
          </main>

        </div>

      </div>

      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">

        <Header />

        <main className="flex-1 px-4 pt-4 pb-24">
          {children}
        </main>

        <BottomNav />

      </div>

    </div>
  )
}