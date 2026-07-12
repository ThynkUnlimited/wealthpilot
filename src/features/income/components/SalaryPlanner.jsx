import Card from "../../../components/ui/Card"

export default function SalaryPlanner({ salary }) {

  const needs = salary * 0.50
  const savings = salary * 0.20
  const investments = salary * 0.15
  const lifestyle = salary * 0.15

  const allocations = [
    {
      name: "Needs",
      icon: "🏠",
      amount: needs,
      percent: 50,
      color: "bg-blue-500",
    },
    {
      name: "Savings",
      icon: "💰",
      amount: savings,
      percent: 20,
      color: "bg-green-500",
    },
    {
      name: "Investments",
      icon: "📈",
      amount: investments,
      percent: 15,
      color: "bg-purple-500",
    },
    {
      name: "Lifestyle",
      icon: "🎉",
      amount: lifestyle,
      percent: 15,
      color: "bg-orange-500",
    },
  ]

  return (

    <Card>

      <div className="mb-5">

        <h3 className="text-sm font-semibold">

          Salary Allocation Planner

        </h3>

        <p className="text-xs text-slate-500 mt-1">

          Suggested monthly allocation based on your salary.

        </p>

      </div>

      <div className="space-y-5">

        {allocations.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between mb-1">

              <span className="text-sm">

                {item.icon} {item.name}

              </span>

              <span className="text-sm font-semibold">

                KSh {item.amount.toLocaleString()}

              </span>

            </div>

            <div className="w-full h-2 rounded-full bg-slate-200">

              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: `${item.percent}%`,
                }}
              />

            </div>

            <p className="mt-1 text-xs text-slate-500">

              {item.percent}%

            </p>

          </div>

        ))}

      </div>

    </Card>

  )

}