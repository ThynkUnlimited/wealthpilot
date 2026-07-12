import { useState, useEffect } from "react"

import { useFinance } from "../../../context/FinanceContext"

export default function AddVaultModal({

  open,

  onClose,

}) {

  const { addWealthVault } = useFinance()

  const [title, setTitle] = useState("")
  const [target, setTarget] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [icon, setIcon] = useState("💰")

  useEffect(() => {

    if (open) {

      setTitle("")
      setTarget("")
      setMonthlyContribution("")
      setPriority("Medium")
      setIcon("💰")

    }

  }, [open])

  if (!open) return null

  const handleSubmit = (e) => {

    e.preventDefault()

    addWealthVault({

      title,

      target,

      monthlyContribution,

      priority,

      icon,

    })

    onClose()

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            Create Wealth Vault

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Create a new financial goal that you will consistently
            protect and grow.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">

              Vault Name

            </label>

            <input

              required

              value={title}

              onChange={(e)=>setTitle(e.target.value)}

              className="w-full rounded-lg border border-slate-300 px-4 py-3"

              placeholder="Emergency Fund"

            />

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">

                Target Amount

              </label>

              <input

                type="number"

                required

                value={target}

                onChange={(e)=>setTarget(e.target.value)}

                className="w-full rounded-lg border border-slate-300 px-4 py-3"

                placeholder="300000"

              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Monthly Deposit

              </label>

              <input

                type="number"

                value={monthlyContribution}

                onChange={(e)=>setMonthlyContribution(e.target.value)}

                className="w-full rounded-lg border border-slate-300 px-4 py-3"

                placeholder="20000"

              />

            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">

                Priority

              </label>

              <select

                value={priority}

                onChange={(e)=>setPriority(e.target.value)}

                className="w-full rounded-lg border border-slate-300 px-4 py-3"

              >

                <option>High</option>
                <option>Medium</option>
                <option>Low</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">

                Icon

              </label>

              <select

                value={icon}

                onChange={(e)=>setIcon(e.target.value)}

                className="w-full rounded-lg border border-slate-300 px-4 py-3"

              >

                <option value="🛡️">🛡️ Emergency</option>
                <option value="🏠">🏠 House</option>
                <option value="🏢">🏢 Business</option>
                <option value="📈">📈 Investment</option>
                <option value="🎓">🎓 Education</option>
                <option value="🚗">🚗 Vehicle</option>
                <option value="💻">💻 Equipment</option>
                <option value="🌍">🌍 Travel</option>
                <option value="💰">💰 General</option>

              </select>

            </div>

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

              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"

            >

              Create Vault

            </button>

          </div>

        </form>

      </div>

    </div>

  )

}