import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function FinancialHealth() {

  const {

    balance,
    savingsRate,
    budgetUsage,

  } = useFinance()

  let score = 100

  if (balance < 0)
    score -= 30

  if (budgetUsage > 100)
    score -= 25
  else if (budgetUsage > 90)
    score -= 15

  if (savingsRate < 20)
    score -= 20

  if (score < 0)
    score = 0

  let status = "Excellent"

  if (score < 80)
    status = "Good"

  if (score < 60)
    status = "Fair"

  if (score < 40)
    status = "Poor"

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">

            Financial Health

          </p>

          <h2 className="mt-2 text-4xl font-bold">

            {score}/100

          </h2>

          <p className="mt-2 text-sm text-slate-500">

            Overall Status

          </p>

          <h3 className="font-semibold text-lg">

            {status}

          </h3>

        </div>

        <div className="text-6xl">

          {score >= 80
            ? "🟢"
            : score >= 60
            ? "🟡"
            : "🔴"}

        </div>

      </div>

    </Card>

  )

}