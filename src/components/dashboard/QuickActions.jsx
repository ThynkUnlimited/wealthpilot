import Card from "../ui/Card"
import {
  PlusCircle,
  Wallet,
  PiggyBank,
  TrendingUp,
} from "lucide-react"

const actions = [
  {
    title: "Expense",
    icon: PlusCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    title: "Income",
    icon: Wallet,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Save",
    icon: PiggyBank,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Invest",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
]

export default function QuickActions() {
  return (
    <Card>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">
          Quick Actions
        </h3>

        <button className="text-xs text-blue-600 hover:text-blue-700 transition">
          View All
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">

        {actions.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.title}
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-2
                rounded-2xl
                p-3
                hover:bg-slate-50
                active:scale-95
                transition-all
                duration-200
              "
            >
              <div
                className={`
                  h-12
                  w-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${item.bg}
                `}
              >
                <Icon
                  size={22}
                  className={item.color}
                />
              </div>

              <span className="text-xs font-medium text-slate-700">
                {item.title}
              </span>
            </button>
          )
        })}

      </div>

    </Card>
  )
}