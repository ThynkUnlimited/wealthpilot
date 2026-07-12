import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import FinancialHealth from "../components/planner/FinancialHealth"
import PlannerOverview from "../components/planner/PlannerOverview"
import PlannerRecommendations from "../components/planner/PlannerRecommendations"

import FinancialInsights from "../components/insights/FinancialInsights"

export default function Planner() {

  return (

    <AppLayout>

      <PageHeader

        title="Financial Planner"

        subtitle="Smart recommendations to improve your financial health."

      />

      <div className="space-y-6">

        <FinancialHealth />

        <PlannerOverview />

        <FinancialInsights />

        <PlannerRecommendations />

      </div>

    </AppLayout>

  )

}