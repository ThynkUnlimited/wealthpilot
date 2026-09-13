import { useMemo } from "react"
import { useFinance } from "../../context/FinanceContext"


/* =====================================
   FORMAT MONEY
===================================== */

const formatMoney = (value) => {

  return `KSh ${Number(value || 0).toLocaleString("en-KE")}`

}


/* =====================================
   FORMAT SHORT MONEY
===================================== */

const formatShortMoney = (value) => {

  const amount = Number(value || 0)

  if (amount >= 1000000) {
    return `KSh ${(amount / 1000000).toFixed(1)}M`
  }

  if (amount >= 1000) {
    return `KSh ${(amount / 1000).toFixed(0)}K`
  }

  return `KSh ${amount.toLocaleString("en-KE")}`

}


/* =====================================
   ACTIVE RECORD CHECK
===================================== */

const isActive = (item) => {

  return item?.status !== "reversed" &&
    item?.status !== "cancelled" &&
    item?.status !== "void"

}


/* =====================================
   BULLET ROW
===================================== */

function BulletRow({
  label,
  description,
  value,
  target,
  type = "default",
  inverted = false,
}) {

  const safeValue = Math.max(
    0,
    Number(value || 0)
  )

  const safeTarget = Math.max(
    0,
    Number(target || 0)
  )


  const percentage =
    safeTarget > 0
      ? Math.min(
          100,
          (safeValue / safeTarget) * 100
        )
      : 0


  const exceeded =
    safeTarget > 0 &&
    safeValue > safeTarget


  let barClass = "bg-blue-600"
  let valueClass = "text-blue-700"
  let statusText = "No target set"
  let statusClass = "text-slate-400"


  /* =================================
     INCOME
  ================================= */

  if (type === "income") {

    barClass = "bg-blue-600"
    valueClass = "text-blue-700"

    if (safeTarget > 0) {

      if (safeValue >= safeTarget) {

        statusText = "Target reached"
        statusClass = "text-emerald-600"

      } else {

        statusText = "Below target"
        statusClass = "text-amber-600"

      }

    }

  }


  /* =================================
     EXPENSES
  ================================= */

  if (type === "expense") {

    barClass = exceeded
      ? "bg-red-500"
      : "bg-emerald-500"

    valueClass = exceeded
      ? "text-red-600"
      : "text-emerald-600"


    if (safeTarget > 0) {

      if (safeValue <= safeTarget) {

        statusText = "Within budget"
        statusClass = "text-emerald-600"

      } else {

        statusText = "Over budget"
        statusClass = "text-red-600"

      }

    }

  }


  /* =================================
     SAVINGS
  ================================= */

  if (type === "savings") {

    barClass = "bg-emerald-500"
    valueClass = "text-emerald-600"

    if (safeTarget > 0) {

      if (safeValue >= safeTarget) {

        statusText = "Goal reached"
        statusClass = "text-emerald-600"

      } else {

        statusText = "In progress"
        statusClass = "text-amber-600"

      }

    }

  }


  /* =================================
     LOAN
  ================================= */

  if (type === "loan") {

    barClass = "bg-purple-500"
    valueClass = "text-purple-600"

    if (safeTarget > 0) {

      if (safeValue >= safeTarget) {

        statusText = "Fully repaid"
        statusClass = "text-emerald-600"

      } else {

        statusText = "Repayment in progress"
        statusClass = "text-purple-600"

      }

    }

  }


  /* =================================
     INVERTED PERFORMANCE
     Used for expenses.
  ================================= */

  const displayPercentage =
    inverted && safeTarget > 0
      ? Math.min(
          100,
          (safeValue / safeTarget) * 100
        )
      : percentage


  return (

    <div className="border-b border-slate-100 py-5 last:border-b-0">

      {/* =================================
          TITLE + VALUE
      ================================= */}

      <div className="mb-3 flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h4 className="text-sm font-semibold text-slate-900">
            {label}
          </h4>

          <p className="mt-0.5 text-xs text-slate-500">
            {description}
          </p>

        </div>


        <div className="shrink-0 text-right">

          <p
            className={`text-sm font-bold ${valueClass}`}
          >
            {formatMoney(safeValue)}
          </p>

          {safeTarget > 0 && (

            <p className="text-[11px] text-slate-400">

              Target{" "}
              {formatMoney(safeTarget)}

            </p>

          )}

        </div>

      </div>


      {/* =================================
          BULLET BAR
      ================================= */}

      <div className="relative">

        {/* BACKGROUND BANDS */}

        <div className="absolute inset-0 flex overflow-hidden rounded-md">

          <div className="w-[50%] bg-slate-100" />

          <div className="w-[25%] bg-slate-200" />

          <div className="w-[25%] bg-slate-300" />

        </div>


        {/* VALUE */}

        <div className="relative h-8 overflow-hidden rounded-md">

          <div
            className={`
              absolute left-0 top-0 h-full
              rounded-md
              transition-all duration-500
              ${barClass}
            `}
            style={{
              width: `${displayPercentage}%`,
            }}
          />


          {/* VALUE */}

          {safeValue > 0 && (

            <div className="relative z-10 flex h-full items-center justify-end px-3">

              <span className="text-xs font-bold text-white drop-shadow-sm">

                {formatShortMoney(safeValue)}

              </span>

            </div>

          )}

        </div>


        {/* TARGET MARKER */}

        {safeTarget > 0 && (

          <div
            className="absolute top-[-5px] z-20 h-[38px] w-px bg-slate-700"
            style={{
              left: "100%",
            }}
          />

        )}

      </div>


      {/* =================================
          FOOTER
      ================================= */}

      <div className="mt-2 flex items-center justify-between">

        <span
          className={`text-xs font-medium ${statusClass}`}
        >
          {statusText}
        </span>

        {safeTarget > 0 && (

          <span className="text-xs text-slate-400">

            {Math.round(
              percentage
            )}
            % of target

          </span>

        )}

      </div>

    </div>

  )

}


/* =====================================
   MAIN COMPONENT
===================================== */

export default function IncomeExpenseChart() {

  const finance = useFinance()


  const {

    income = [],
    expenses = [],
    budgets = [],
    savingsGoals = [],
    liabilities = [],

  } = finance


  /* =====================================
     CALCULATE REAL FINANCIAL DATA
  ===================================== */

  const analytics = useMemo(() => {

    /* ================================
       INCOME
    ================================= */

    const activeIncome =
      income.filter(isActive)


    const totalIncome =
      activeIncome.reduce(
        (total, item) =>
          total +
          Number(item.amount || 0),
        0
      )


    /* ================================
       EXPENSES
    ================================= */

    const activeExpenses =
      expenses.filter(isActive)


    const totalExpenses =
      activeExpenses.reduce(
        (total, item) =>
          total +
          Number(item.amount || 0),
        0
      )


    /* ================================
       BUDGET
    ================================= */

    const totalBudget =
      budgets.reduce(
        (total, item) =>
          total +
          Number(
            item.budget ??
            item.amount ??
            0
          ),
        0
      )


    /* ================================
       SAVINGS
    ================================= */

    const totalSavings =
      savingsGoals.reduce(
        (total, goal) =>
          total +
          Number(
            goal.saved ??
            goal.currentAmount ??
            0
          ),
        0
      )


    const savingsTarget =
      savingsGoals.reduce(
        (total, goal) =>
          total +
          Number(
            goal.target ??
            goal.targetAmount ??
            0
          ),
        0
      )


    /* ================================
       LIABILITIES
    ================================= */

    const activeLiabilities =
      liabilities.filter(
        (item) =>
          isActive(item) &&
          item.status !== "cleared"
      )


    const originalDebt =
      activeLiabilities.reduce(
        (total, item) =>
          total +
          Number(
            item.originalAmount ??
            item.amount ??
            0
          ),
        0
      )


    const currentDebt =
      activeLiabilities.reduce(
        (total, item) =>
          total +
          Number(
            item.currentBalance ??
            item.outstandingBalance ??
            0
          ),
        0
      )


    /* ================================
       TOTAL ORIGINAL DEBT
       Includes cleared loans so that
       repayment progress remains meaningful.
    ================================= */

    const allLiabilities =
      liabilities || []


    const allOriginalDebt =
      allLiabilities.reduce(
        (total, item) =>
          total +
          Number(
            item.originalAmount ??
            item.amount ??
            0
          ),
        0
      )


    const totalRepaid =
      Math.max(
        0,
        allOriginalDebt - currentDebt
      )


    /* ================================
       NET CASH FLOW
    ================================= */

    const netCashFlow =
      totalIncome -
      totalExpenses


    return {

      totalIncome,
      totalExpenses,

      totalBudget,

      totalSavings,
      savingsTarget,

      originalDebt:
        allOriginalDebt ||
        originalDebt,

      currentDebt,

      totalRepaid,

      netCashFlow,

    }

  }, [
    income,
    expenses,
    budgets,
    savingsGoals,
    liabilities,
  ])


  /* =====================================
     INCOME TARGET
     
     We don't invent a salary target.
     If there is no target field in the
     existing data model, show actual
     income without pretending there is
     a target.
  ===================================== */

  const incomeTarget =
    income.reduce(
      (total, item) =>
        total +
        Number(
          item.target ??
          item.targetAmount ??
          0
        ),
      0
    )


  return (

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =================================
          HEADER
      ================================= */}

      <div className="border-b border-slate-100 px-5 py-5">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <h3 className="text-base font-bold text-slate-900">
              Financial Performance
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Your actual financial position based on recorded WealthPilot data.
            </p>

          </div>

          <div className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
            Live data
          </div>

        </div>

      </div>


      {/* =================================
          SUMMARY
      ================================= */}

      <div className="grid grid-cols-2 border-b border-slate-100 sm:grid-cols-4">

        {/* INCOME */}

        <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Income
          </p>

          <p className="mt-1 text-lg font-bold text-blue-600">
            {formatShortMoney(
              analytics.totalIncome
            )}
          </p>

        </div>


        {/* EXPENSES */}

        <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Expenses
          </p>

          <p className="mt-1 text-lg font-bold text-red-600">
            {formatShortMoney(
              analytics.totalExpenses
            )}
          </p>

        </div>


        {/* SAVINGS */}

        <div className="border-b border-slate-100 px-5 py-4 sm:border-b-0 sm:border-r">

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Savings
          </p>

          <p className="mt-1 text-lg font-bold text-emerald-600">
            {formatShortMoney(
              analytics.totalSavings
            )}
          </p>

        </div>


        {/* NET */}

        <div className="px-5 py-4">

          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Net Cash Flow
          </p>

          <p
            className={`
              mt-1 text-lg font-bold
              ${
                analytics.netCashFlow >= 0
                  ? "text-slate-900"
                  : "text-red-600"
              }
            `}
          >
            {formatShortMoney(
              analytics.netCashFlow
            )}
          </p>

        </div>

      </div>


      {/* =================================
          BULLET CHARTS
      ================================= */}

      <div className="px-5">

        {/* ==============================
            INCOME
        ============================== */}

        <BulletRow
          label="Income"
          description="Total recorded income from your active income records."
          value={analytics.totalIncome}
          target={incomeTarget}
          type="income"
        />


        {/* ==============================
            EXPENSES
        ============================== */}

        <BulletRow
          label="Expenses"
          description="Total spending compared with your recorded budget."
          value={analytics.totalExpenses}
          target={analytics.totalBudget}
          type="expense"
          inverted
        />


        {/* ==============================
            SAVINGS
        ============================== */}

        <BulletRow
          label="Savings"
          description="Current savings compared with your savings goals."
          value={analytics.totalSavings}
          target={analytics.savingsTarget}
          type="savings"
        />


        {/* ==============================
            LOAN REPAYMENT
        ============================== */}

        <BulletRow
          label="Loan Repayment Progress"
          description="Amount repaid against the original recorded liabilities."
          value={analytics.totalRepaid}
          target={analytics.originalDebt}
          type="loan"
        />

      </div>


      {/* =================================
          DEBT INFORMATION
      ================================= */}

      {analytics.currentDebt > 0 && (

        <div className="mx-5 mb-5 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-semibold text-purple-900">
                Remaining Debt
              </p>

              <p className="mt-0.5 text-[11px] text-purple-700">
                Current outstanding loan balance.
              </p>

            </div>

            <p className="text-sm font-bold text-purple-700">

              {formatMoney(
                analytics.currentDebt
              )}

            </p>

          </div>

        </div>

      )}


      {/* =================================
          FOOTER
      ================================= */}

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-500">

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-sm bg-slate-100 ring-1 ring-slate-200" />

            <span>Lower range</span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />

            <span>Expected range</span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-sm bg-slate-300" />

            <span>Higher range</span>

          </div>

          <div className="flex items-center gap-2">

            <span className="h-4 w-px bg-slate-700" />

            <span>Target</span>

          </div>

        </div>

      </div>

    </div>

  )

}