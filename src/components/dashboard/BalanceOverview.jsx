import Card from "../ui/Card"

import { useFinance } from "../../context/FinanceContext"

export default function BalanceOverview() {

  const {

    balance,

    totalIncome,

    totalExpenses,

  } = useFinance()

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <Card>

        <p className="text-xs text-slate-500">

          Balance

        </p>

        <h2 className="text-xl font-bold mt-2 text-blue-600">

          KSh {balance.toLocaleString()}

        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">

          Income

        </p>

        <h2 className="text-xl font-bold mt-2 text-green-600">

          KSh {totalIncome.toLocaleString()}

        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">

          Expenses

        </p>

        <h2 className="text-xl font-bold mt-2 text-red-600">

          KSh {totalExpenses.toLocaleString()}

        </h2>

      </Card>

    </div>

  )

}