import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import budgetCategories from "../features/budget/data/budgetCategories"
import BudgetProgressCard from "../features/budget/components/BudgetProgressCard"

export default function Budget() {

  return (

    <AppLayout>

      <PageHeader
        title="Monthly Budget"
        subtitle="Track spending against your monthly budget."
      />

      <div className="grid gap-4">

        {budgetCategories.map((item) => (

          <BudgetProgressCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </AppLayout>

  )

}