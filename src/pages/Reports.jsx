import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import ExecutiveSummary from "../components/reports/ExecutiveSummary"
import ReportOverview from "../components/reports/ReportOverview"

export default function Reports() {

  return (

    <AppLayout>

      <PageHeader

        title="Financial Reports"

        subtitle="Generate comprehensive reports about your finances."

      />

      <div className="space-y-6">

        <ExecutiveSummary />

        <ReportOverview />

      </div>

    </AppLayout>

  )

}