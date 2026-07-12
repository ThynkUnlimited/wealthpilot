import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import savingsGoals from "../features/savings/data/savingsGoals"

import SavingsGoalCard from "../features/savings/components/SavingsGoalCard"

export default function Savings() {

  return (

    <AppLayout>

      <PageHeader
        title="Savings Goals"
        subtitle="Track progress toward your financial goals."
      />

      <div className="space-y-4">

        {savingsGoals.map((goal) => (

          <SavingsGoalCard
            key={goal.id}
            goal={goal}
          />

        ))}

      </div>

    </AppLayout>

  )

}