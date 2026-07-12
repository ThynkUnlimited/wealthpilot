import { useMemo, useState } from "react"
import { useFinance } from "../../context/FinanceContext"

export default function TransactionTable() {

  const { transactions } = useFinance()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTransactions = useMemo(() => {

    return transactions.filter(item => {

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())

      const matchesFilter =
        filter === "all" || item.type === filter

      return matchesSearch && matchesFilter

    })

  }, [transactions, search, filter])

  return (

    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full rounded-lg border px-3 py-2 text-sm md:max-w-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-4 py-3 text-left">Date</th>

              <th className="px-4 py-3 text-left">Title</th>

              <th className="px-4 py-3 text-left">Category</th>

              <th className="px-4 py-3 text-left">Type</th>

              <th className="px-4 py-3 text-center">Status</th>

              <th className="px-4 py-3 text-right">Amount</th>

              <th className="px-4 py-3 text-center">
                Audit Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No transactions found.
                </td>

              </tr>

            ) : (

              filteredTransactions.map((item) => (

                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-t"
                >

                  <td className="px-4 py-3">
                    {item.date}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {item.title}
                  </td>

                  <td className="px-4 py-3">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {item.type}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium

                      ${
                        item.status === "credit-note"
                          ? "bg-amber-100 text-amber-700"

                        : item.status === "reversed"
                        ? "bg-red-100 text-red-700"

                        : "bg-green-100 text-green-700"
                      }

                      `}
                    >

                      {item.status || "active"}

                    </span>

                  </td>

                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >

                    {item.type === "income" ? "+" : "-"}

                    KSh {item.amount.toLocaleString()}

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex flex-wrap justify-center gap-2">

                      <button
                        className="rounded-lg border px-3 py-1 text-xs hover:bg-slate-100"
                      >
                        ✏️ Correct Entry
                      </button>

                      <button
                        className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1 text-xs text-amber-700 hover:bg-amber-100"
                      >
                        📄 Issue Credit Note
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}