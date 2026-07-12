import Card from "../ui/Card"
import { Eye, ArrowUpRight } from "lucide-react"

export default function HeroCard() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-xs text-blue-100">
            Total Balance
          </p>

          <h1 className="text-2xl font-bold mt-2">
            KSh 124,500
          </h1>

          <p className="text-xs mt-2 text-blue-100">
            Updated just now
          </p>

        </div>

        <button>
          <Eye size={18} />
        </button>

      </div>

      <div className="mt-5 flex gap-3">

        <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-medium">

          <ArrowUpRight size={16} />

          Add Income

        </button>

      </div>

    </Card>
  )
}