export default function SavingsGoalCard({ goal }) {

  const percent = Math.min(
    Math.round((goal.saved / goal.target) * 100),
    100
  )

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex justify-between">

        <div>

          <h3 className="text-sm font-semibold">

            {goal.icon} {goal.title}

          </h3>

          <p className="text-xs text-slate-500 mt-1">

            KSh {goal.saved.toLocaleString()} of KSh {goal.target.toLocaleString()}

          </p>

        </div>

        <div>

          <span className="font-bold">

            {percent}%

          </span>

        </div>

      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-200">

        <div
          className="h-2 rounded-full bg-green-500"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>

  )

}