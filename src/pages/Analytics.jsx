import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import IncomeExpenseChart from "../components/charts/IncomeExpenseChart"

export default function Analytics() {

  return (

    <AppLayout>

      <PageHeader
        title="Analytics"
        subtitle="Understand your financial trends."
      />

      <div className="space-y-6">

        <IncomeExpenseChart />

      </div>

    </AppLayout>

  )

}