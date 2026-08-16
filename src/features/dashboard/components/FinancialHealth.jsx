import Card from "../../../components/ui/Card"

import { useFinance } from "../../../context/FinanceContext"

import {
  HeartPulse,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"

export default function FinancialHealth() {

  const {

    totalIncome,

    totalExpenses,

    totalVaultBalance,

    budgetUsage,

    balance,

    savingsRate,

  } = useFinance()

  let score = 0

  /* -------------------------
      Score Calculation
  ------------------------- */

  if (balance >= 0) score += 30

  if (totalIncome > totalExpenses) score += 20

  if (savingsRate >= 20) score += 20

  if (budgetUsage <= 80) score += 20

  if (totalVaultBalance >= totalIncome * 0.20) score += 10

  if (score > 100) score = 100

  /* -------------------------
      Rating
  ------------------------- */

  let rating = "Critical"

  let color = "bg-red-500"

  let textColor = "text-red-600"

  let advice =
    "Your finances need immediate attention."

  if (score >= 40) {

    rating = "Needs Improvement"

    color = "bg-orange-500"

    textColor = "text-orange-600"

    advice =
      "Reduce unnecessary spending and improve savings."

  }

  if (score >= 60) {

    rating = "Good"

    color = "bg-yellow-500"

    textColor = "text-yellow-600"

    advice =
      "You're doing well. Keep building your savings."

  }

  if (score >= 80) {

    rating = "Very Good"

    color = "bg-blue-500"

    textColor = "text-blue-600"

    advice =
      "Strong financial habits. Stay consistent."

  }

  if (score >= 95) {

    rating = "Excellent"

    color = "bg-green-600"

    textColor = "text-green-600"

    advice =
      "Excellent work. Your finances are very healthy."

  }

  return (

    <Card>

      <div className="flex items-start justify-between">

        <div>

          <h3 className="flex items-center gap-2 text-xl font-bold">

            <HeartPulse
              size={22}
              className="text-red-500"
            />

            Financial Health

          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">

            Calculated from your income, expenses,
            savings and budgeting.

          </p>

        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${textColor} bg-slate-100 dark:bg-slate-800`}
        >

          {rating}

        </div>

      </div>

      {/* Score */}

      <div className="mt-8">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-medium">

            Overall Score

          </span>

          <span className="text-3xl font-bold">

            {score}/100

          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

          <div

            className={`${color} h-4 transition-all duration-700`}

            style={{

              width: `${score}%`,

            }}

          />

        </div>

      </div>

      {/* Advice */}

      <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-800">

        <h4 className="mb-4 font-semibold">

          Financial Insights

        </h4>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-3">

            <TrendingUp
              size={18}
              className="text-green-600"
            />

            <span>

              Savings Rate: <strong>{savingsRate}%</strong>

            </span>

          </div>

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={18}
              className="text-blue-600"
            />

            <span>

              Wealth Protected:

              <strong>

                {" "}
                KES {totalVaultBalance.toLocaleString()}

              </strong>

            </span>

          </div>

          <div className="flex items-center gap-3">

            <AlertTriangle
              size={18}
              className="text-orange-500"
            />

            <span>

              Budget Usage:

              <strong>

                {" "}
                {budgetUsage}%

              </strong>

            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">

        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">

          💡 {advice}

        </p>

      </div>

    </Card>

  )

}