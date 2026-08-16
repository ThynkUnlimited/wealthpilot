import { useState } from "react"

import { X } from "lucide-react"

import { useFinance } from "../../../context/FinanceContext"

export default function AddBudgetModal({

  open,

  onClose,

}) {

  const { addBudget } = useFinance()

  const today = new Date()

  const [category, setCategory] = useState("Food")

  const [amount, setAmount] = useState("")

  const [month, setMonth] = useState(today.getMonth() + 1)

  const [year, setYear] = useState(today.getFullYear())

  const [notes, setNotes] = useState("")

  const [saving, setSaving] = useState(false)

  if (!open) return null

  const handleSave = async () => {

    if (!amount) return

    setSaving(true)

    await addBudget({

      category,

      amount: Number(amount),

      month,

      year,

      notes,

    })

    setSaving(false)

    setCategory("Food")

    setAmount("")

    setNotes("")

    onClose()

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Add Monthly Budget

          </h2>

          <button onClick={onClose}>

            <X />

          </button>

        </div>

        <div className="space-y-4">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Category

            </label>

            <select

              value={category}

              onChange={(e)=>setCategory(e.target.value)}

              className="w-full rounded-xl border p-3"

            >

              <option>Food</option>

              <option>Transport</option>

              <option>Housing</option>

              <option>Utilities</option>

              <option>Entertainment</option>

              <option>Education</option>

              <option>Medical</option>

              <option>Shopping</option>

              <option>Insurance</option>

              <option>Investment</option>

              <option>Other</option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Budget Amount

            </label>

            <input

              type="number"

              value={amount}

              onChange={(e)=>setAmount(e.target.value)}

              className="w-full rounded-xl border p-3"

              placeholder="20000"

            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium">

                Month

              </label>

              <select

                value={month}

                onChange={(e)=>setMonth(Number(e.target.value))}

                className="w-full rounded-xl border p-3"

              >

                {[

                  "January",

                  "February",

                  "March",

                  "April",

                  "May",

                  "June",

                  "July",

                  "August",

                  "September",

                  "October",

                  "November",

                  "December",

                ].map((m,index)=>(

                  <option

                    key={m}

                    value={index+1}

                  >

                    {m}

                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Year

              </label>

              <input

                type="number"

                value={year}

                onChange={(e)=>setYear(Number(e.target.value))}

                className="w-full rounded-xl border p-3"

              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Notes

            </label>

            <textarea

              rows={3}

              value={notes}

              onChange={(e)=>setNotes(e.target.value)}

              className="w-full rounded-xl border p-3"

            />

          </div>

          <button

            onClick={handleSave}

            disabled={saving}

            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

          >

            {saving

              ? "Saving..."

              : "Save Budget"}

          </button>

        </div>

      </div>

    </div>

  )

}