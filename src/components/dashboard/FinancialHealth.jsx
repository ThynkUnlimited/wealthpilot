import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function FinancialHealth() {

  const {

    savingsRate,

    budgetUsage,

  } = useFinance()

  let score = 100

  if (budgetUsage > 80) score -= 20

  if (budgetUsage > 100) score -= 20

  if (savingsRate < 20) score -= 20

  if (savingsRate < 10) score -= 20

  let status = "Excellent"

  if (score < 90) status = "Good"

  if (score < 70) status = "Fair"

  if (score < 50) status = "Needs Attention"

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-slate-500">

            Financial Health

          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-600">

            {score}/100

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            {status}

          </p>

        </div>

        <div className="text-5xl">

          {score >= 90 ? "🏆" : score >= 70 ? "👍" : "⚠️"}

        </div>

      </div>

    </Card>

  )

}