import Card from "../../../components/ui/Card"

export default function ExpenseSummary({ expenses }) {

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )

  const totalExpenses = expenses.length

  const averageExpense =
    totalExpenses > 0
      ? Math.round(totalSpent / totalExpenses)
      : 0

  const highestExpense =
    totalExpenses > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0

  const cards = [
    {
      title: "Total Spent",
      value: `KSh ${totalSpent.toLocaleString()}`,
      color: "text-red-600",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      color: "text-blue-600",
    },
    {
      title: "Average",
      value: `KSh ${averageExpense.toLocaleString()}`,
      color: "text-green-600",
    },
    {
      title: "Highest",
      value: `KSh ${highestExpense.toLocaleString()}`,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {cards.map((card) => (

        <Card key={card.title}>

          <p className="text-xs text-slate-500">
            {card.title}
          </p>

          <h3 className={`mt-2 text-lg font-bold ${card.color}`}>
            {card.value}
          </h3>

        </Card>

      ))}

    </div>
  )
}