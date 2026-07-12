import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function LiveBudgetCard() {

  const { budgets } = useFinance()

  const totalBudget = budgets.reduce(
    (sum, item) => sum + item.budget,
    0
  )

  const totalSpent = budgets.reduce(
    (sum, item) => sum + item.spent,
    0
  )

  const percent =
    totalBudget > 0
      ? Math.round((totalSpent / totalBudget) * 100)
      : 0

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-slate-500">
            Monthly Budget
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {percent}%
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            KSh {totalSpent.toLocaleString()} of KSh {totalBudget.toLocaleString()}
          </p>

        </div>

        <div className="text-4xl">
          📊
        </div>

      </div>

      <div className="mt-5 h-2 rounded-full bg-slate-200">

        <div
          className={`h-2 rounded-full ${
            percent >= 90
              ? "bg-red-500"
              : percent >= 70
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{
            width: `${Math.min(percent, 100)}%`,
          }}
        />

      </div>

    </Card>

  )

}