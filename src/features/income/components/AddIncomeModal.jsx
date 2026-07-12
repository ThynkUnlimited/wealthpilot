import { useState } from "react"
import { useFinance } from "../../../context/FinanceContext"

export default function AddIncomeModal({ open, onClose }) {

  const { addIncome } = useFinance()

  const [form, setForm] = useState({
    title: "",
    category: "Salary",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Bank",
    reference: "",
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

    addIncome(form)

    setForm({

      title: "",
      category: "Salary",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "Bank",
      reference: "",
      notes: "",

    })

    onClose()

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">

            Add Income

          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="mb-1 block text-sm font-medium">

              Income Title

            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="July Salary"
              required
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <label className="mb-1 block text-sm font-medium">

                Income Source

              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >

                <option>Salary</option>
                <option>Forex Trading</option>
                <option>Side Hustle</option>
                <option>Business</option>
                <option>Rental Income</option>
                <option>Bonus</option>
                <option>Gift</option>
                <option>Interest</option>
                <option>Other</option>

              </select>

            </div>

            <div>

              <label className="mb-1 block text-sm font-medium">

                Amount

              </label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />

            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <label className="mb-1 block text-sm font-medium">

                Date Received

              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-1 block text-sm font-medium">

                Payment Method

              </label>

              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >

                <option>Bank</option>
                <option>M-Pesa</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>PayPal</option>
                <option>Other</option>

              </select>

            </div>

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">

              Reference Number

            </label>

            <input
              name="reference"
              value={form.reference}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">

              Notes

            </label>

            <textarea
              rows="3"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Save Income
            </button>

          </div>

        </form>

      </div>

    </div>

  )

}