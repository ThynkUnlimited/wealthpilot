import { useMemo, useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import ExpenseSummary from "../features/expenses/components/ExpenseSummary"
import ExpenseFilters from "../features/expenses/components/ExpenseFilters"
import ExpenseCard from "../features/expenses/components/ExpenseCard"
import AddExpenseModal from "../features/expenses/components/AddExpenseModal"

import { useFinance } from "../context/FinanceContext"

export default function Expenses() {

  const {
    expenses,
    addExpense,
  } = useFinance()

  const [openModal, setOpenModal] = useState(false)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("latest")

  const filteredExpenses = useMemo(() => {

    let data = [...expenses]

    if (search) {
      data = data.filter((expense) =>
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    if (category !== "All") {
      data = data.filter(
        (expense) => expense.category === category
      )
    }

    switch (sortBy) {

      case "highest":
        data.sort((a, b) => b.amount - a.amount)
        break

      case "lowest":
        data.sort((a, b) => a.amount - b.amount)
        break

      case "alphabetical":
        data.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
        break

      default:
        break

    }

    return data

  }, [expenses, search, category, sortBy])

  return (
    <AppLayout>

      <PageHeader
        title="Expenses"
        subtitle="Track every shilling you spend."
      />

      <div className="space-y-6">

        <ExpenseSummary expenses={filteredExpenses} />

        <ExpenseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="flex justify-end">

          <button
            onClick={() => setOpenModal(true)}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-blue-700
              transition
            "
          >
            + Add Expense
          </button>

        </div>

        <div className="space-y-4">

          {filteredExpenses.length > 0 ? (

            filteredExpenses.map((expense) => (

              <ExpenseCard
                key={expense.id}
                expense={expense}
              />

            ))

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">

              <p className="text-slate-500">
                No expenses found.
              </p>

            </div>

          )}

        </div>

      </div>

      <AddExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addExpense}
      />

    </AppLayout>
  )
}