import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function FinancialMetrics() {

  const {

    totalSavings,

    savingsRate,

    budgetUsage,

  } = useFinance()

  return (

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

      <Card>

        <p className="text-xs text-slate-500">

          Total Savings

        </p>

        <h2 className="mt-2 text-lg font-bold text-green-600">

          KSh {totalSavings.toLocaleString()}

        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">

          Savings Rate

        </p>

        <h2 className="mt-2 text-lg font-bold text-blue-600">

          {savingsRate}%

        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">

          Budget Used

        </p>

        <h2 className="mt-2 text-lg font-bold text-orange-600">

          {budgetUsage}%

        </h2>

      </Card>

    </div>

  )

}