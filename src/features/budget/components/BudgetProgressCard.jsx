export default function BudgetProgressCard({ item }) {

  const percent = Math.min(
    Math.round((item.spent / item.budget) * 100),
    100
  )

  let color = "bg-green-500"

  if (percent >= 70) color = "bg-yellow-500"

  if (percent >= 90) color = "bg-red-500"

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex justify-between">

        <div>

          <h3 className="text-sm font-semibold">

            {item.icon} {item.name}

          </h3>

          <p className="text-xs text-slate-500 mt-1">

            KSh {item.spent.toLocaleString()} of KSh {item.budget.toLocaleString()}

          </p>

        </div>

        <div className="text-right">

          <span className="text-sm font-bold">

            {percent}%

          </span>

        </div>

      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-200">

        <div
          className={`${color} h-2 rounded-full`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>

  )

}