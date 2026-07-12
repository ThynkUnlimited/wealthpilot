import {
    Home,
    Wallet,
    PlusCircle,
    BarChart3,
    User
} from "lucide-react"

export default function BottomNav() {

    return (

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">

            <div className="grid grid-cols-5 h-16">

                <button className="flex flex-col items-center justify-center text-blue-600">

                    <Home size={18} />

                    <span className="text-[10px]">
                        Home
                    </span>

                </button>

                <button className="flex flex-col items-center justify-center">

                    <Wallet size={18} />

                    <span className="text-[10px]">
                        Money
                    </span>

                </button>

                <button className="flex flex-col items-center justify-center">

                    <PlusCircle
                        size={34}
                        className="text-blue-600"
                    />

                </button>

                <button className="flex flex-col items-center justify-center">

                    <BarChart3 size={18} />

                    <span className="text-[10px]">
                        Reports
                    </span>

                </button>

                <button className="flex flex-col items-center justify-center">

                    <User size={18} />

                    <span className="text-[10px]">
                        Profile
                    </span>

                </button>

            </div>

        </nav>

    )

}