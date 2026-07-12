export default function ExpenseCard({
  expense,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">

            {expense.title}

          </h3>

          <p className="text-sm text-slate-500">

            {expense.category}

          </p>

        </div>

        <div className="text-right">

          <p className="font-bold text-red-600">

            -KSh {expense.amount.toLocaleString()}

          </p>

          <p className="text-xs text-slate-400">

            {expense.date}

          </p>

        </div>

      </div>

    </div>
  )
}