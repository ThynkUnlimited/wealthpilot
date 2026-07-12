import Card from "../ui/Card"

export default function HealthCard({ health }) {
  return (
    <Card>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-xs text-slate-500">
            Financial Health
          </p>

          <h2 className="text-xl font-bold mt-1">
            {health.score}%
          </h2>

          <p className="text-xs text-green-600 mt-1">
            {health.status}
          </p>

        </div>

        <div className="h-16 w-16 rounded-full border-4 border-green-500 flex items-center justify-center">

          <span className="text-sm font-semibold">
            {health.score}
          </span>

        </div>

      </div>

    </Card>
  )
}