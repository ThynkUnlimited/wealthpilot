import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function PlannerRecommendations() {

  const {

    balance,
    savingsRate,
    budgetUsage,

  } = useFinance()

  const recommendations = []

  if (balance < 0) {
    recommendations.push(
      "Your expenses are currently higher than your income. Consider reducing discretionary spending."
    )
  }

  if (budgetUsage > 90) {
    recommendations.push(
      "You have used more than 90% of your budget. Review upcoming expenses."
    )
  }

  if (savingsRate < 20) {
    recommendations.push(
      "Aim to save at least 20% of your monthly income if possible."
    )
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Great work! Your finances appear to be on track. Continue monitoring your spending and savings."
    )
  }

  return (

    <Card>

      <h2 className="text-lg font-semibold">
        Recommendations
      </h2>

      <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-700">

        {recommendations.map((item, index) => (

          <li key={index}>{item}</li>

        ))}

      </ul>

    </Card>

  )

}