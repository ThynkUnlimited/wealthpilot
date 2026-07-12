import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const data = [
  {
    month: "Jan",
    income: 120000,
    expenses: 45000,
  },
  {
    month: "Feb",
    income: 120000,
    expenses: 52000,
  },
  {
    month: "Mar",
    income: 130000,
    expenses: 47000,
  },
  {
    month: "Apr",
    income: 120000,
    expenses: 61000,
  },
]

export default function IncomeExpenseChart() {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <h3 className="mb-4 text-sm font-semibold">

        Income vs Expenses

      </h3>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#16a34a"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#dc2626"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}