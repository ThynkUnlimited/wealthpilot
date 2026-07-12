import Card from "../ui/Card"

export default function LiveSummaryCard({
  title,
  value,
  color = "text-slate-900",
}) {
  return (
    <Card>

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <h2 className={`mt-2 text-xl font-bold ${color}`}>
        {value}
      </h2>

    </Card>
  )
}