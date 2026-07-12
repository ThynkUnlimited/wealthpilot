import { useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import { useFinance } from "../context/FinanceContext"

import IncomeSummary from "../features/income/components/IncomeSummary"
import SalaryPlanner from "../features/income/components/SalaryPlanner"
import AddIncomeModal from "../features/income/components/AddIncomeModal"
import useIncomeSearch from "../features/income/components/useIncomeSearch"
import IncomeTable from "../features/income/components/IncomeTable"

export default function Income() {

  const { income, totalIncome } = useFinance()

  const [openModal, setOpenModal] = useState(false)

  const {

    filteredIncome,
    search,
    setSearch,
    filter,
    setFilter,
    categories,

  } = useIncomeSearch(income)

  return (

    <AppLayout>

      <PageHeader
        title="Income"
        subtitle="Manage your salary and other income sources."
      />

      <div className="space-y-6">

        <div className="flex justify-end">

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            + Add Income
          </button>

        </div>

        <IncomeSummary income={income} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-2">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search income..."
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3"
            >

              {categories.map(category => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

          </div>

        </div>

        {filteredIncome.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <h3 className="text-lg font-semibold">

              No income records found

            </h3>

            <p className="mt-2 text-slate-500">

              Click <strong>+ Add Income</strong> to record your first income.

            </p>

          </div>

        ) : (

          <IncomeTable income={filteredIncome} />

        )}

        <SalaryPlanner salary={totalIncome} />

      </div>

      <AddIncomeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </AppLayout>

  )

}