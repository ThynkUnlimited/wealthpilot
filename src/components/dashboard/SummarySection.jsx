import StatCard from "../ui/StatCard"

export default function SummarySection({ summary }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

      <StatCard
        title="Net Worth"
        value={`KSh ${summary.netWorth.toLocaleString()}`}
      />

      <StatCard
        title="Income"
        value={`KSh ${summary.income.toLocaleString()}`}
        color="text-green-600"
      />

      <StatCard
        title="Expenses"
        value={`KSh ${summary.expenses.toLocaleString()}`}
        color="text-red-500"
      />

      <StatCard
        title="Saved"
        value={`KSh ${summary.savings.toLocaleString()}`}
        color="text-blue-600"
      />

    </div>
  )
}