import { useMemo } from "react"

export default function IncomeSummary({ income }) {

  const totalIncome = useMemo(() => {

    return income.reduce(
      (sum, item) => sum + item.amount,
      0
    )

  }, [income])

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyIncome = useMemo(() => {

    return income
      .filter(item => {

        const date = new Date(item.date)

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        )

      })
      .reduce(
        (sum, item) => sum + item.amount,
        0
      )

  }, [income])

  const incomeSources = new Set(
    income.map(item => item.category)
  ).size

  const latestIncome =
    income.length > 0
      ? income
          .slice()
          .sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )[0].date
      : "-"

  const cards = [

    {
      title: "Total Income",
      value: `KSh ${totalIncome.toLocaleString()}`,
      icon: "💰",
      color: "bg-green-100 text-green-700",
    },

    {
      title: "This Month",
      value: `KSh ${monthlyIncome.toLocaleString()}`,
      icon: "📅",
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Income Sources",
      value: incomeSources,
      icon: "📂",
      color: "bg-purple-100 text-purple-700",
    },

    {
      title: "Latest Income",
      value: latestIncome,
      icon: "🧾",
      color: "bg-amber-100 text-amber-700",
    },

  ]

  return (

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                {card.title}

              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-800">

                {card.value}

              </h2>

            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${card.color}`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>

  )

}