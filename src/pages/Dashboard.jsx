import AppLayout from "../components/layout/AppLayout"

import BalanceOverview from "../components/dashboard/BalanceOverview"
import FinancialMetrics from "../components/dashboard/FinancialMetrics"
import MonthlyOverview from "../components/dashboard/MonthlyOverview"
import FinancialHealth from "../components/dashboard/FinancialHealth"
import LiveSummary from "../components/dashboard/LiveSummary"
import LiveBudgetCard from "../components/dashboard/LiveBudgetCard"
import LiveSavingsCard from "../components/dashboard/LiveSavingsCard"
import LiveTransactions from "../components/dashboard/LiveTransactions"
import QuickActions from "../components/dashboard/QuickActions"
import UpcomingBills from "../components/dashboard/UpcomingBills"
import AIInsight from "../components/dashboard/AIInsight"

import dashboardData from "../data/dashboardData"

export default function Dashboard() {

  return (

    <AppLayout>

      <div className="mx-auto max-w-7xl space-y-6">

        {/* Welcome */}

        <section>

          <h1 className="text-2xl font-bold text-slate-900">

            {dashboardData.user.greeting}

          </h1>

          <p className="mt-1 text-sm text-slate-500">

            Welcome back, {dashboardData.user.name}.

          </p>

        </section>

        {/* Balance */}

        <BalanceOverview />

        {/* Financial Metrics */}

        <FinancialMetrics />

        {/* Monthly Overview */}

        <MonthlyOverview />

        {/* Live Summary */}

        <LiveSummary />

        {/* Quick Actions */}

        <QuickActions />

        {/* Health + Budget */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <FinancialHealth />

          <LiveBudgetCard />

        </div>

        {/* Live Savings */}

        <LiveSavingsCard />

        {/* Transactions + Bills */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <LiveTransactions />

          <UpcomingBills />

        </div>

        {/* AI Coach */}

        <AIInsight />

      </div>

    </AppLayout>

  )

}