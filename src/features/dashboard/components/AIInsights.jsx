import Card from "../../../components/ui/Card"

import { useFinance } from "../../../context/FinanceContext"

import {
  Brain,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"

export default function AIInsights() {

  const {

    totalIncome,

    totalExpenses,

    balance,

    budgetUsage,

    totalVaultBalance,

    savingsRate,

  } = useFinance()

  const insights = []

  /* ===========================
      Cash Flow
  =========================== */

  if (balance > 0) {

    insights.push({

      icon: TrendingUp,

      color: "text-green-600",

      title: "Positive Cash Flow",

      message: `Great job! You currently have KES ${balance.toLocaleString()} remaining after expenses.`,

    })

  } else {

    insights.push({

      icon: TrendingDown,

      color: "text-red-600",

      title: "Negative Cash Flow",

      message:
        "Your expenses are exceeding your income. Review your largest expenses.",

    })

  }

  /* ===========================
      Budget
  =========================== */

  if (budgetUsage >= 90) {

    insights.push({

      icon: AlertTriangle,

      color: "text-orange-600",

      title: "Budget Alert",

      message:
        "You are close to exceeding one or more budgets.",

    })

  }

  /* ===========================
      Savings
  =========================== */

  if (savingsRate < 20) {

    insights.push({

      icon: PiggyBank,

      color: "text-yellow-600",

      title: "Increase Savings",

      message:
        "Aim to save at least 20% of your monthly income for long-term financial stability.",

    })

  } else {

    insights.push({

      icon: PiggyBank,

      color: "text-green-600",

      title: "Healthy Savings",

      message: `Excellent! Your current savings rate is ${savingsRate}%.`,

    })

  }

  /* ===========================
      Wealth Protection
  =========================== */

  if (totalVaultBalance < totalIncome * 0.20) {

    insights.push({

      icon: ShieldCheck,

      color: "text-blue-600",

      title: "Grow Your Wealth Vault",

      message:
        "Consider moving part of your surplus into your Wealth Vault to build financial security.",

    })

  } else {

    insights.push({

      icon: ShieldCheck,

      color: "text-emerald-600",

      title: "Wealth Protection",

      message:
        "Your emergency reserves are progressing well. Keep contributing consistently.",

    })

  }

  return (

    <Card>

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">

          <Brain
            size={24}
            className="text-violet-600"
          />

        </div>

        <div>

          <h3 className="text-xl font-bold">

            AI Financial Coach

          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">

            Personalized insights generated from your financial activity.

          </p>

        </div>

      </div>

      <div className="space-y-4">

        {insights.map((item, index) => {

          const Icon = item.icon

          return (

            <div

              key={index}

              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"

            >

              <div className="flex items-start gap-4">

                <div>

                  <Icon

                    size={22}

                    className={item.color}

                  />

                </div>

                <div>

                  <h4 className="font-semibold">

                    {item.title}

                  </h4>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                    {item.message}

                  </p>

                </div>

              </div>

            </div>

          )

        })}

      </div>

    </Card>

  )

}