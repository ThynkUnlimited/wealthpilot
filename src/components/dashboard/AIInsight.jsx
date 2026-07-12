import Card from "../ui/Card"

export default function AIInsight() {
  return (
    <Card>

      <div className="flex items-start gap-3">

        <div className="text-2xl">
            🤖
        </div>

        <div>

          <h3 className="text-sm font-semibold">
            AI Financial Coach
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-6">

            You spent more on shopping this week than last week.

            Consider reducing discretionary spending to remain
            within your monthly budget.

          </p>

        </div>

      </div>

    </Card>
  )
}