import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function FinancialMetrics() {

  const {
    totalSavings,
    savingsRate,
    budgetUsage,
    totalVaultBalance,
  } = useFinance()

  return (

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      {/* =================================
          TOTAL SAVINGS
      ================================= */}

      <Card>

        <p className="text-xs text-slate-500 dark:text-slate-400">

          Total Savings

        </p>

        <h2 className="mt-2 text-lg font-bold text-green-600">

          KSh {Number(totalSavings || 0).toLocaleString()}

        </h2>

      </Card>

      {/* =================================
          SAVINGS RATE
      ================================= */}

      <Card>

        <p className="text-xs text-slate-500 dark:text-slate-400">

          Savings Rate

        </p>

        <h2 className="mt-2 text-lg font-bold text-blue-600">

          {Number(savingsRate || 0)}%

        </h2>

      </Card>

      {/* =================================
          BUDGET USED
      ================================= */}

      <Card>

        <p className="text-xs text-slate-500 dark:text-slate-400">

          Budget Used

        </p>

        <h2 className="mt-2 text-lg font-bold text-orange-600">

          {Number(budgetUsage || 0)}%

        </h2>

      </Card>

      {/* =================================
          WEALTH PROTECTED
      ================================= */}

      <Card>

        <p className="text-xs text-slate-500 dark:text-slate-400">

          Wealth Protected

        </p>

        <h2 className="mt-2 text-lg font-bold text-purple-600">

          KSh {Number(totalVaultBalance || 0).toLocaleString()}

        </h2>

      </Card>

    </div>

  )

}