import Card from "../ui/Card"
import mockExpenses from "../../features/expenses/data/mockExpenses"

export default function RecentTransactions() {
  const recent = [...mockExpenses].slice(0, 5)

  return (
    <Card>

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-sm font-semibold text-slate-800">
          Recent Transactions
        </h3>

        <button className="text-xs text-blue-600 hover:text-blue-700">
          View All
        </button>

      </div>

      <div className="space-y-3">

        {recent.map((expense) => (

          <div
            key={expense.id}
            className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none"
          >

            <div>

              <p className="text-sm font-medium">
                {expense.title}
              </p>

              <p className="text-xs text-slate-500">
                {expense.category}
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm font-semibold text-red-600">
                -KSh {expense.amount.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">
                {expense.date}
              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  )
}