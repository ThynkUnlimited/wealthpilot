import { useNavigate } from "react-router-dom"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"
import Card from "../components/ui/Card"

import { useFinance } from "../context/FinanceContext"

import DashboardMetrics from "../features/dashboard/components/DashboardMetrics"
import FinancialHealth from "../features/dashboard/components/FinancialHealth"
import AIInsights from "../features/dashboard/components/AIInsights"
import RecentActivity from "../features/dashboard/components/RecentActivity"

export default function Dashboard() {

  const navigate = useNavigate()

  const {
    budgetSummary,
  } = useFinance()

  return (

    <AppLayout>

      <PageHeader
        title="Dashboard"
        subtitle="Welcome back. Here's your financial overview."
      />

      <div className="space-y-6">

        {/* =========================================
            KPI CARDS
        ========================================= */}

        <DashboardMetrics />

        {/* =========================================
            FINANCIAL HEALTH & AI
        ========================================= */}

        <div className="grid gap-6 xl:grid-cols-2">

          <FinancialHealth />

          <AIInsights />

        </div>

        {/* =========================================
            RECENT ACTIVITY & BUDGET OVERVIEW
        ========================================= */}

        <div className="grid gap-6 xl:grid-cols-2">

          {/* Recent Activity */}

          <RecentActivity />

          {/* Budget Overview */}

          <Card>

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">

                  Budget Overview

                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  Monitor your monthly spending progress.

                </p>

              </div>

              <button

                onClick={() => navigate("/budget")}

                className="text-sm font-semibold text-blue-600 hover:text-blue-700"

              >

                View Budget

              </button>

            </div>

            <div className="mt-6 space-y-5">

              {budgetSummary.length === 0 ? (

                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">

                  <p className="font-medium text-slate-600 dark:text-slate-300">

                    No budgets created yet.

                  </p>

                  <p className="mt-1 text-sm text-slate-500">

                    Create your monthly budget to start tracking your spending.

                  </p>

                  <button

                    onClick={() => navigate("/budget")}

                    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"

                  >

                    + Create Budget

                  </button>

                </div>

              ) : (

                budgetSummary.map((budget) => {

                  const percentage = Math.min(

                    100,

                    Math.max(

                      0,

                      Number(budget.percentage || 0)

                    )

                  )

                  const isOverBudget =

                    Number(budget.spent || 0) >

                    Number(budget.amount || 0)

                  const isWarning =

                    percentage >= 80 &&

                    !isOverBudget

                  let barColor = "bg-emerald-600"

                  let textColor = "text-slate-900 dark:text-white"

                  if (isOverBudget) {

                    barColor = "bg-red-500"

                    textColor = "text-red-600"

                  } else if (isWarning) {

                    barColor = "bg-amber-500"

                    textColor = "text-amber-600"

                  }

                  return (

                    <div

                      key={budget.id}

                    >

                      <div className="mb-2 flex items-center justify-between">

                        <span className="font-medium">

                          {budget.icon || "📊"}{" "}

                          {budget.name || budget.category}

                        </span>

                        <span

                          className={`font-semibold ${textColor}`}

                        >

                          {percentage}%

                        </span>

                      </div>

                      <div className="mb-2 flex justify-between text-xs text-slate-500">

                        <span>

                          KSh{" "}

                          {Number(

                            budget.spent || 0

                          ).toLocaleString()}

                          {" "}spent

                        </span>

                        <span>

                          KSh{" "}

                          {Number(

                            budget.amount || 0

                          ).toLocaleString()}

                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">

                        <div

                          className={`h-3 rounded-full transition-all ${barColor}`}

                          style={{

                            width: `${percentage}%`,

                          }}

                        />

                      </div>

                    </div>

                  )

                })

              )}

            </div>

          </Card>

        </div>

        {/* =========================================
            QUICK ACTIONS
        ========================================= */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold">

                Quick Actions

              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">

                Quickly record your financial activities.

              </p>

            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <button

              onClick={() => navigate("/income")}

              className="rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"

            >

              + Add Income

            </button>

            <button

              onClick={() => navigate("/expenses")}

              className="rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700"

            >

              + Add Expense

            </button>

            <button

              onClick={() => navigate("/budget")}

              className="rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700"

            >

              + Budget

            </button>

            <button

              onClick={() => navigate("/wealth-vault")}

              className="rounded-xl bg-purple-600 py-4 font-semibold text-white transition hover:bg-purple-700"

            >

              + Wealth Vault

            </button>

          </div>

        </Card>

      </div>

    </AppLayout>

  )

}