import Card from "../ui/Card"
import ProgressBar from "../ui/ProgressBar"
import { Target } from "lucide-react"

export default function SavingsCard({ goal }) {
  const percentage = (goal.saved / goal.target) * 100

  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-600" />

            <p className="text-xs font-medium text-slate-500">
              Savings Goal
            </p>
          </div>

          <h2 className="text-lg font-bold mt-2">
            {goal.name}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-blue-600">
            {Math.round(percentage)}%
          </p>
        </div>

      </div>

      <div className="mt-4">
        <ProgressBar
          value={goal.saved}
          max={goal.target}
        />
      </div>

      <div className="flex justify-between mt-3 text-xs text-slate-500">

        <span>
          KSh {goal.saved.toLocaleString()}
        </span>

        <span>
          KSh {goal.target.toLocaleString()}
        </span>

      </div>

    </Card>
  )
}