import LiveSummaryCard from "./LiveSummaryCard"
import { useFinance } from "../../context/FinanceContext"

export default function LiveSummary() {

  const {

    totalIncome,

    totalExpenses,

    balance,

    totalSavings,

  } = useFinance()

  return (

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <LiveSummaryCard
        title="Income"
        value={`KSh ${totalIncome.toLocaleString()}`}
        color="text-green-600"
      />

      <LiveSummaryCard
        title="Expenses"
        value={`KSh ${totalExpenses.toLocaleString()}`}
        color="text-red-600"
      />

      <LiveSummaryCard
        title="Balance"
        value={`KSh ${balance.toLocaleString()}`}
        color="text-blue-600"
      />

      <LiveSummaryCard
        title="Saved"
        value={`KSh ${totalSavings.toLocaleString()}`}
        color="text-emerald-600"
      />

    </div>

  )

}