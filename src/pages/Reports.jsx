import { useMemo, useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import IncomeStatement from "../components/reports/IncomeStatement"
import BalanceSheet from "../components/reports/BalanceSheet"
import CashFlowStatement from "../components/reports/CashFlowStatement"

import { useFinance } from "../context/FinanceContext"


/* =========================================
   HELPERS
========================================= */

function toNumber(value) {
  return Number(value || 0)
}


function getDateValue(value) {

  if (!value) return null

  if (
    typeof value === "object" &&
    typeof value.toDate === "function"
  ) {
    return value.toDate()
  }

  if (
    typeof value === "object" &&
    value.seconds
  ) {
    return new Date(value.seconds * 1000)
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date

}


function isActive(record) {

  return (
    !record.status ||
    record.status === "active"
  )

}


function formatCurrency(value) {

  return `KSh ${toNumber(value).toLocaleString(
    "en-KE",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  )}`

}


/* =========================================
   PERIOD FILTER
========================================= */

function getPeriodStart(period) {

  const now = new Date()

  if (period === "all") {
    return null
  }

  if (period === "month") {

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    )

  }

  if (period === "3months") {

    return new Date(
      now.getFullYear(),
      now.getMonth() - 2,
      1
    )

  }

  if (period === "6months") {

    return new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1
    )

  }

  if (period === "year") {

    return new Date(
      now.getFullYear(),
      0,
      1
    )

  }

  return null

}


function withinPeriod(record, period) {

  const start = getPeriodStart(period)

  if (!start) {
    return true
  }

  const date =
    getDateValue(
      record.date ||
      record.transactionDate ||
      record.createdAt
    )

  if (!date) {
    return false
  }

  return date >= start

}


/* =========================================
   REPORTS PAGE
========================================= */

export default function Reports() {

  const {
    income = [],
    expenses = [],
    assets = [],
    liabilities = [],
    loading,
  } = useFinance()


  const [activeReport, setActiveReport] =
    useState("overview")

  const [period, setPeriod] =
    useState("year")


  /* =========================================
     FILTERED DATA
  ========================================= */

  const filteredIncome = useMemo(() => {

    return income.filter(
      (item) =>
        isActive(item) &&
        withinPeriod(item, period)
    )

  }, [income, period])


  const filteredExpenses = useMemo(() => {

    return expenses.filter(
      (item) =>
        isActive(item) &&
        withinPeriod(item, period)
    )

  }, [expenses, period])


  /* =========================================
     TOTALS
  ========================================= */

  const totalIncome = useMemo(() => {

    return filteredIncome.reduce(
      (total, item) =>
        total + toNumber(item.amount),
      0
    )

  }, [filteredIncome])


  const totalExpenses = useMemo(() => {

    return filteredExpenses.reduce(
      (total, item) =>
        total + toNumber(item.amount),
      0
    )

  }, [filteredExpenses])


  const netProfit =
    totalIncome - totalExpenses


  const totalAssets = useMemo(() => {

    return assets.reduce(
      (total, asset) => {

        const value =
          asset.value ??
          asset.currentValue ??
          0

        return total + toNumber(value)

      },
      0
    )

  }, [assets])


  const totalLiabilities =
    useMemo(() => {

      return liabilities.reduce(
        (total, liability) => {

          const balance =
            liability.currentBalance ??
            liability.outstandingBalance ??
            0

          return total + toNumber(balance)

        },
        0
      )

    }, [liabilities])


  const netWorth =
    totalAssets - totalLiabilities


  const profitMargin =
    totalIncome > 0
      ? (netProfit / totalIncome) * 100
      : 0


  /* =========================================
     REPORT TABS
  ========================================= */

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      description: "Financial position",
    },
    {
      id: "income",
      label: "Income Statement",
      description: "Profit & loss",
    },
    {
      id: "balance",
      label: "Balance Sheet",
      description: "Assets & liabilities",
    },
    {
      id: "cashflow",
      label: "Cash Flow",
      description: "Money movement",
    },
  ]


  /* =========================================
     PRINT
  ========================================= */

  const handlePrint = () => {

    window.print()

  }


  return (

    <AppLayout>

      <PageHeader
        title="Financial Reports"
        subtitle="Professional financial statements and management reporting."
      />


      <div className="space-y-5">


        {/* ===================================
            REPORT CONTROL BAR
        =================================== */}

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-base font-bold text-slate-900">
              Reporting Centre
            </h2>

            <p className="text-xs text-slate-500">
              Review your financial performance and position.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-2">

            <select
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium outline-none focus:border-blue-500"
            >

              <option value="month">
                This Month
              </option>

              <option value="3months">
                Last 3 Months
              </option>

              <option value="6months">
                Last 6 Months
              </option>

              <option value="year">
                This Year
              </option>

              <option value="all">
                All Time
              </option>

            </select>


            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Print Report
            </button>

          </div>

        </div>


        {/* ===================================
            TOP FINANCIAL METRICS
        =================================== */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">


          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium text-slate-500">
              Income
            </p>

            <p className="mt-1 text-xl font-bold text-emerald-600">
              {formatCurrency(totalIncome)}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Selected reporting period
            </p>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium text-slate-500">
              Expenses
            </p>

            <p className="mt-1 text-xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Selected reporting period
            </p>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium text-slate-500">
              Net Profit
            </p>

            <p
              className={`mt-1 text-xl font-bold ${
                netProfit >= 0
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(netProfit)}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Margin {profitMargin.toFixed(1)}%
            </p>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs font-medium text-slate-500">
              Net Worth
            </p>

            <p className="mt-1 text-xl font-bold text-violet-600">
              {formatCurrency(netWorth)}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Assets less liabilities
            </p>

          </div>

        </div>


        {/* ===================================
            NAVIGATION TABS
        =================================== */}

        <div className="overflow-x-auto">

          <div className="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveReport(tab.id)
                }
                className={`rounded-xl px-4 py-2.5 text-left transition ${
                  activeReport === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >

                <div className="text-sm font-bold">
                  {tab.label}
                </div>

                <div
                  className={`text-[10px] ${
                    activeReport === tab.id
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  {tab.description}
                </div>

              </button>

            ))}

          </div>

        </div>


        {/* ===================================
            REPORT CONTENT
        =================================== */}

        {loading ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm text-slate-500">
              Preparing your financial reports...
            </p>

          </div>

        ) : (

          <>

            {activeReport === "overview" && (

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">


                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="mb-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Performance
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      Financial Performance
                    </h3>

                  </div>


                  <div className="space-y-4">

                    <div>

                      <div className="mb-1 flex justify-between text-sm">

                        <span className="text-slate-500">
                          Income
                        </span>

                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(totalIncome)}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width:
                              totalIncome > 0
                                ? "100%"
                                : "0%",
                          }}
                        />

                      </div>

                    </div>


                    <div>

                      <div className="mb-1 flex justify-between text-sm">

                        <span className="text-slate-500">
                          Expenses
                        </span>

                        <span className="font-semibold text-red-600">
                          {formatCurrency(totalExpenses)}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width:
                              totalIncome > 0
                                ? `${Math.min(
                                    100,
                                    (totalExpenses /
                                      totalIncome) *
                                      100
                                  )}%`
                                : "0%",
                          }}
                        />

                      </div>

                    </div>


                    <div className="border-t border-slate-100 pt-4">

                      <div className="flex items-center justify-between">

                        <span className="font-semibold text-slate-700">
                          Net Result
                        </span>

                        <span
                          className={`text-lg font-bold ${
                            netProfit >= 0
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatCurrency(netProfit)}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="mb-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                      Financial Position
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      Balance Snapshot
                    </h3>

                  </div>


                  <div className="grid grid-cols-2 gap-3">


                    <div className="rounded-xl bg-emerald-50 p-4">

                      <p className="text-xs text-emerald-700">
                        Total Assets
                      </p>

                      <p className="mt-1 text-lg font-bold text-emerald-700">
                        {formatCurrency(totalAssets)}
                      </p>

                    </div>


                    <div className="rounded-xl bg-red-50 p-4">

                      <p className="text-xs text-red-700">
                        Total Liabilities
                      </p>

                      <p className="mt-1 text-lg font-bold text-red-700">
                        {formatCurrency(totalLiabilities)}
                      </p>

                    </div>


                    <div className="col-span-2 rounded-xl bg-violet-50 p-4">

                      <p className="text-xs text-violet-700">
                        Net Worth
                      </p>

                      <p className="mt-1 text-2xl font-bold text-violet-700">
                        {formatCurrency(netWorth)}
                      </p>

                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">

                  <div className="mb-4 flex items-center justify-between">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Reports
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        Financial Statements
                      </h3>

                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      WealthPilot
                    </span>

                  </div>


                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">


                    <button
                      type="button"
                      onClick={() =>
                        setActiveReport("income")
                      }
                      className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >

                      <p className="text-sm font-bold text-slate-900">
                        Income Statement
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Revenue, expenses and net profit.
                      </p>

                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        setActiveReport("balance")
                      }
                      className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >

                      <p className="text-sm font-bold text-slate-900">
                        Balance Sheet
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Assets, liabilities and equity.
                      </p>

                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        setActiveReport("cashflow")
                      }
                      className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >

                      <p className="text-sm font-bold text-slate-900">
                        Cash Flow Statement
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Cash received and cash spent.
                      </p>

                    </button>

                  </div>

                </div>

              </div>

            )}


            {activeReport === "income" && (

              <IncomeStatement
                income={filteredIncome}
                expenses={filteredExpenses}
                period={period}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                netProfit={netProfit}
              />

            )}


            {activeReport === "balance" && (

              <BalanceSheet
                assets={assets}
                liabilities={liabilities}
                totalAssets={totalAssets}
                totalLiabilities={totalLiabilities}
                netWorth={netWorth}
              />

            )}


            {activeReport === "cashflow" && (

              <CashFlowStatement
                income={filteredIncome}
                expenses={filteredExpenses}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                netCashFlow={netProfit}
                period={period}
              />

            )}

          </>

        )}

      </div>

    </AppLayout>

  )

}