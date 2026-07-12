import { useFinance } from "../../../context/FinanceContext"

export default function IncomeCard({ income }) {

  const { issueCreditNote } = useFinance()

  const handleCreditNote = () => {

    const reason = prompt("Reason for issuing this Credit Note")

    if (!reason) return

    issueCreditNote({
      type: "income",
      id: income.id,
      reason,
    })

  }

  const badgeClass =
    income.status === "credit-note"
      ? "bg-red-100 text-red-700"
      : income.status === "reversed"
      ? "bg-amber-100 text-amber-700"
      : "bg-green-100 text-green-700"

  const badgeText =
    income.status === "credit-note"
      ? "Credit Note"
      : income.status === "reversed"
      ? "Reversed"
      : "Active"

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="space-y-3">

          <div className="flex items-center gap-3">

            <h2 className="text-lg font-semibold text-slate-800">

              {income.title}

            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
            >
              {badgeText}
            </span>

          </div>

          <p className="text-sm text-slate-500">

            Source: <strong>{income.category}</strong>

          </p>

          <p className="text-sm text-slate-500">

            Date: {income.date}

          </p>

          {income.paymentMethod && (

            <p className="text-sm text-slate-500">

              Payment Method: {income.paymentMethod}

            </p>

          )}

          {income.reference && (

            <p className="text-sm text-slate-500">

              Reference: {income.reference}

            </p>

          )}

          {income.notes && (

            <p className="text-sm text-slate-500">

              Notes: {income.notes}

            </p>

          )}

          {income.reason && (

            <div className="rounded-lg bg-red-50 p-3">

              <p className="text-sm font-medium text-red-700">

                Credit Note Reason

              </p>

              <p className="text-sm text-red-600">

                {income.reason}

              </p>

            </div>

          )}

        </div>

        <div className="flex flex-col items-end gap-3">

          <h3
            className={`text-2xl font-bold ${
              income.amount >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            KSh {Math.abs(income.amount).toLocaleString()}
          </h3>

          {income.status === "active" && (

            <button
              onClick={handleCreditNote}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
            >
              Issue Credit Note
            </button>

          )}

        </div>

      </div>

    </div>

  )

}