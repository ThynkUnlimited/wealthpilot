import Card from "../ui/Card"
import ProgressBar from "../ui/ProgressBar"

export default function BudgetCard({ budget }) {

  const percentage = (budget.spent / budget.total) * 100

  return (
    <Card>

      <div className="flex justify-between">

        <div>

          <p className="text-xs text-slate-500">
            Monthly Budget
          </p>

          <h2 className="text-xl font-bold mt-1">
            KSh {budget.spent.toLocaleString()}
          </h2>

        </div>

        <div className="text-right">

          <p className="text-xs text-slate-500">
            Remaining
          </p>

          <p className="text-sm font-semibold text-green-600">
            KSh {(budget.total - budget.spent).toLocaleString()}
          </p>

        </div>

      </div>

      <div className="mt-4">

        <ProgressBar
          value={budget.spent}
          max={budget.total}
        />

      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-500">

        <span>0</span>

        <span>{Math.round(percentage)}%</span>

        <span>{budget.total.toLocaleString()}</span>

      </div>

    </Card>
  )
}