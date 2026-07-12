import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function FinancialInsights() {

  const {

    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
    budgetUsage,

  } = useFinance()

  const insights = []

  if (balance < 0) {

    insights.push({

      title: "Negative Cash Flow",

      message:
        "Your expenses are greater than your income. Review your largest expense categories.",

      type: "danger",

    })

  }

  if (budgetUsage > 90) {

    insights.push({

      title: "Budget Alert",

      message:
        "You have used over 90% of your monthly budget.",

      type: "warning",

    })

  }

  if (savingsRate < 20) {

    insights.push({

      title: "Savings Opportunity",

      message:
        "Aim to save at least 20% of your monthly income if possible.",

      type: "warning",

    })

  }

  if (balance > 0 && savingsRate >= 20) {

    insights.push({

      title: "Excellent Progress",

      message:
        "You are maintaining a healthy balance between spending and saving.",

      type: "success",

    })

  }

  if (totalIncome === 0) {

    insights.push({

      title: "No Income Recorded",

      message:
        "Add your income to receive more accurate financial recommendations.",

      type: "info",

    })

  }

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        AI Financial Insights

      </h2>

      <div className="mt-5 space-y-4">

        {insights.map((insight, index) => (

          <div
            key={index}
            className={`rounded-xl border p-4

            ${
              insight.type === "danger"

                ? "border-red-300 bg-red-50"

                : insight.type === "warning"

                ? "border-yellow-300 bg-yellow-50"

                : insight.type === "success"

                ? "border-green-300 bg-green-50"

                : "border-blue-300 bg-blue-50"

            }

            `}
          >

            <h3 className="font-semibold">

              {insight.title}

            </h3>

            <p className="mt-2 text-sm">

              {insight.message}

            </p>

          </div>

        ))}

      </div>

    </Card>

  )

}