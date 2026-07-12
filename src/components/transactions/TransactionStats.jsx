import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function TransactionStats() {

  const {

    transactions,

    totalIncome,

    totalExpenses,

    balance,

  } = useFinance()

  return (

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      <Card>

        <p className="text-xs text-slate-500">
          Transactions
        </p>

        <h2 className="mt-2 text-xl font-bold">
          {transactions.length}
        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">
          Income
        </p>

        <h2 className="mt-2 text-xl font-bold text-green-600">
          KSh {totalIncome.toLocaleString()}
        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">
          Expenses
        </p>

        <h2 className="mt-2 text-xl font-bold text-red-600">
          KSh {totalExpenses.toLocaleString()}
        </h2>

      </Card>

      <Card>

        <p className="text-xs text-slate-500">
          Balance
        </p>

        <h2 className={`mt-2 text-xl font-bold ${
          balance >= 0
            ? "text-blue-600"
            : "text-red-600"
        }`}>
          KSh {balance.toLocaleString()}
        </h2>

      </Card>

    </div>

  )

}