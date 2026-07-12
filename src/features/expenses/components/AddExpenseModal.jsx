import { useState } from "react"
import categories from "../data/categories"

export default function AddExpenseModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  if (!open) return null

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title || !form.amount) return

    onSave({
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    })

    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-lg font-semibold">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Expense name"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 text-sm"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 text-sm"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 text-sm"
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 text-sm"
          />

          <textarea
            name="notes"
            rows="3"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 text-sm"
          />

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
            >
              Save Expense
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}