import { useEffect, useState } from "react"

export default function EditIncomeModal({

  open,

  income,

  onClose,

  onSave,

}) {

  const [form, setForm] = useState({

    title: "",

    category: "",

    amount: "",

    paymentMethod: "",

    reference: "",

    date: "",

  })

  useEffect(() => {

    if (income) {

      setForm({

        title: income.title || "",

        category: income.category || "",

        amount: income.amount || "",

        paymentMethod: income.paymentMethod || "",

        reference: income.reference || "",

        date: income.date || "",

      })

    }

  }, [income])

  if (!open) return null

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    onSave(form)

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">

          Edit Income

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Income Title"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            placeholder="Payment Method"
            className="w-full rounded-lg border p-3"
          />

          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            placeholder="Reference"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

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
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  )

}