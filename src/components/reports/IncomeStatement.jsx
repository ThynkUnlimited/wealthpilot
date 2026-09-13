function money(value) {

  return `KSh ${Number(value || 0).toLocaleString(
    "en-KE"
  )}`

}


function active(record) {

  return (
    !record.status ||
    record.status === "active"
  )

}


export default function IncomeStatement({

  income = [],
  expenses = [],
  totalIncome = 0,
  totalExpenses = 0,
  netProfit = 0,
}) {


  const incomeGroups = {}

  income
    .filter(active)
    .forEach((item) => {

      const category =
        item.category ||
        item.source ||
        "Other Income"

      incomeGroups[category] =
        (incomeGroups[category] || 0) +
        Number(item.amount || 0)

    })


  const expenseGroups = {}

  expenses
    .filter(active)
    .forEach((item) => {

      const category =
        item.category ||
        "Other Expenses"

      expenseGroups[category] =
        (expenseGroups[category] || 0) +
        Number(item.amount || 0)

    })


  const margin =
    totalIncome > 0
      ? (netProfit / totalIncome) * 100
      : 0


  return (

    <div className="space-y-5">


      {/* REPORT HEADER */}

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
              Financial Statement
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Income Statement
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Statement of financial performance
            </p>

          </div>


          <div className="text-left md:text-right">

            <p className="text-xs text-slate-400">
              Reporting period
            </p>

            <p className="font-semibold">
              Selected period
            </p>

          </div>

        </div>

      </div>


      {/* PROFIT CARD */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">


        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

          <p className="text-xs font-medium text-emerald-700">
            Total Income
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {money(totalIncome)}
          </p>

        </div>


        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">

          <p className="text-xs font-medium text-red-700">
            Total Expenses
          </p>

          <p className="mt-2 text-2xl font-bold text-red-700">
            {money(totalExpenses)}
          </p>

        </div>


        <div
          className={`rounded-2xl border p-5 ${
            netProfit >= 0
              ? "border-blue-100 bg-blue-50"
              : "border-red-100 bg-red-50"
          }`}
        >

          <p className="text-xs font-medium text-slate-600">
            Net Profit / (Loss)
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              netProfit >= 0
                ? "text-blue-700"
                : "text-red-700"
            }`}
          >
            {money(netProfit)}
          </p>

        </div>

      </div>


      {/* STATEMENT */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h3 className="font-bold text-slate-900">
            Statement of Profit or Loss
          </h3>

        </div>


        <div className="p-5">


          {/* INCOME */}

          <div className="mb-8">

            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-emerald-700">
                Income
              </h4>

              <span className="font-bold text-emerald-700">
                {money(totalIncome)}
              </span>

            </div>


            {Object.keys(incomeGroups).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No income recorded for this period.
              </p>

            ) : (

              Object.entries(incomeGroups).map(
                ([category, amount]) => (

                  <div
                    key={category}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {category}
                    </span>

                    <span className="font-medium text-slate-900">
                      {money(amount)}
                    </span>

                  </div>

                )
              )

            )}

          </div>


          {/* EXPENSES */}

          <div className="mb-8">

            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-red-700">
                Expenses
              </h4>

              <span className="font-bold text-red-700">
                {money(totalExpenses)}
              </span>

            </div>


            {Object.keys(expenseGroups).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No expenses recorded for this period.
              </p>

            ) : (

              Object.entries(expenseGroups).map(
                ([category, amount]) => (

                  <div
                    key={category}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {category}
                    </span>

                    <span className="font-medium text-slate-900">
                      {money(amount)}
                    </span>

                  </div>

                )
              )

            )}

          </div>


          {/* NET */}

          <div className="rounded-xl bg-slate-900 p-5 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-slate-400">
                  NET RESULT
                </p>

                <p className="mt-1 text-lg font-bold">
                  Net Profit / (Loss)
                </p>

              </div>

              <p
                className={`text-2xl font-bold ${
                  netProfit >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {money(netProfit)}
              </p>

            </div>


            <div className="mt-4 border-t border-slate-700 pt-3">

              <p className="text-xs text-slate-400">
                Profit margin
              </p>

              <p className="font-semibold">
                {margin.toFixed(1)}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}