import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function LiveSavingsCard() {

  const { savingsGoals } = useFinance()

  const totalTarget = savingsGoals.reduce(
    (sum, goal) => sum + goal.target,
    0
  )

  const totalSaved = savingsGoals.reduce(
    (sum, goal) => sum + goal.saved,
    0
  )

  const percent =
    totalTarget > 0
      ? Math.round((totalSaved / totalTarget) * 100)
      : 0

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-slate-500">
            Savings Goals
          </p>

          <h2 className="mt-2 text-xl font-bold text-green-600">
            {percent}%
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            KSh {totalSaved.toLocaleString()} of KSh {totalTarget.toLocaleString()}
          </p>

        </div>

        <div className="text-4xl">
          🏦
        </div>

      </div>

      <div className="mt-5 h-2 rounded-full bg-slate-200">

        <div
          className="h-2 rounded-full bg-green-500"
          style={{
            width: `${Math.min(percent,100)}%`
          }}
        />

      </div>

    </Card>

  )

}