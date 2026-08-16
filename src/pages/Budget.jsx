import { useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import Card from "../components/ui/Card"

import { useFinance } from "../context/FinanceContext"

import AddBudgetModal from "../features/budget/components/AddBudgetModal"

export default function Budget() {

  const {

    budgetSummary,

    totalBudget,

    totalSpentBudget,

  } = useFinance()

  const [openModal, setOpenModal] = useState(false)

  return (

    <AppLayout>

      <PageHeader
        title="Monthly Budget"
        subtitle="Track your monthly budgets using real expense data."
      />

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">

            Budget Overview

          </h2>

          <p className="text-slate-500">

            Total Budget:
            {" "}
            <span className="font-semibold">

              KSh {totalBudget.toLocaleString()}

            </span>

          </p>

          <p className="text-slate-500">

            Total Spent:
            {" "}
            <span className="font-semibold text-red-600">

              KSh {totalSpentBudget.toLocaleString()}

            </span>

          </p>

        </div>

        <button

          onClick={() => setOpenModal(true)}

          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

        >

          + Add Budget

        </button>

      </div>

      <div className="grid gap-5">

        {

          budgetSummary.length === 0

          ? (

            <Card>

              <div className="py-12 text-center">

                <h3 className="text-xl font-semibold">

                  No Budgets Yet

                </h3>

                <p className="mt-2 text-slate-500">

                  Click

                  {" "}

                  <strong>

                    Add Budget

                  </strong>

                  {" "}

                  to create your first monthly budget.

                </p>

              </div>

            </Card>

          )

          : (

            budgetSummary.map((budget) => (

              <Card key={budget.id}>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-lg font-bold">

                      {budget.category}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {budget.month}/{budget.year}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">

                      Budget

                    </p>

                    <p>

                      KSh {Number(budget.amount).toLocaleString()}

                    </p>

                  </div>

                </div>

                <div className="mb-2 flex justify-between text-sm">

                  <span>

                    Spent

                  </span>

                  <span>

                    KSh {budget.spent.toLocaleString()}

                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-200">

                  <div

                    className={`h-3 rounded-full transition-all

                      ${budget.percentage >= 100

                        ? "bg-red-600"

                        : budget.percentage >= 80

                        ? "bg-amber-500"

                        : "bg-green-600"

                      }`}

                    style={{

                      width: `${Math.min(budget.percentage,100)}%`,

                    }}

                  />

                </div>

                <div className="mt-4 flex justify-between text-sm">

                  <span>

                    Remaining

                  </span>

                  <span

                    className={

                      budget.remaining < 0

                      ? "font-semibold text-red-600"

                      : "font-semibold text-green-600"

                    }

                  >

                    KSh {budget.remaining.toLocaleString()}

                  </span>

                </div>

              </Card>

            ))

          )

        }

      </div>

      <AddBudgetModal

        open={openModal}

        onClose={() => setOpenModal(false)}

      />

    </AppLayout>

  )

}