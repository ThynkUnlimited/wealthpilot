import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function PlannerOverview() {

  const {

    totalIncome,
    totalExpenses,
    balance,
    savingsRate,

  } = useFinance()

  return (

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <Card>

        <p className="text-sm text-slate-500">
          Monthly Income
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-600">
          KSh {totalIncome.toLocaleString()}
        </h2>

      </Card>

      <Card>

        <p className="text-sm text-slate-500">
          Monthly Expenses
        </p>

        <h2 className="mt-2 text-2xl font-bold text-red-600">
          KSh {totalExpenses.toLocaleString()}
        </h2>

      </Card>

      <Card>

        <p className="text-sm text-slate-500">
          Current Balance
        </p>

        <h2 className="mt-2 text-2xl font-bold text-blue-600">
          KSh {balance.toLocaleString()}
        </h2>

      </Card>

      <Card>

        <p className="text-sm text-slate-500">
          Savings Rate
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {savingsRate}%
        </h2>

      </Card>

    </div>

  )

}