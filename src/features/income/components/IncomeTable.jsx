import { useFinance } from "../../../context/FinanceContext"

export default function IncomeTable({ income }) {

  const { issueCreditNote } = useFinance()

  const handleCreditNote = (id) => {

    const reason = prompt("Reason for issuing this Credit Note")

    if (!reason) return

    issueCreditNote({

      type: "income",

      id,

      reason,

    })

  }

  return (

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left text-sm font-semibold text-slate-600">

              <th className="px-5 py-4">Date</th>

              <th className="px-5 py-4">Title</th>

              <th className="px-5 py-4">Source</th>

              <th className="px-5 py-4">Payment</th>

              <th className="px-5 py-4">Reference</th>

              <th className="px-5 py-4 text-right">Amount</th>

              <th className="px-5 py-4 text-center">Status</th>

              <th className="px-5 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {income.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-5 py-4">

                  {item.date}

                </td>

                <td className="px-5 py-4 font-medium">

                  {item.title}

                </td>

                <td className="px-5 py-4">

                  {item.category}

                </td>

                <td className="px-5 py-4">

                  {item.paymentMethod || "-"}

                </td>

                <td className="px-5 py-4">

                  {item.reference || "-"}

                </td>

                <td className="px-5 py-4 text-right font-bold">

                  KSh {Math.abs(item.amount).toLocaleString()}

                </td>

                <td className="px-5 py-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "reversed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      className="rounded-lg border px-3 py-1 text-xs hover:bg-slate-100"
                    >
                      View
                    </button>

                    {item.status === "active" && (

                      <button
                        onClick={() => handleCreditNote(item.id)}
                        className="rounded-lg border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Credit Note
                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}