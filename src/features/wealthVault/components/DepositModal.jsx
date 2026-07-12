import { useState, useEffect } from "react"

import { useFinance } from "../../../context/FinanceContext"

export default function DepositModal({

  vault,

  open,

  onClose,

}) {

  const { depositToVault } = useFinance()

  const [amount, setAmount] = useState("")

  const [source, setSource] = useState("Salary")

  useEffect(() => {

    if (open) {

      setAmount("")
      setSource("Salary")

    }

  }, [open])

  if (!open || !vault) return null

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!amount) return

    depositToVault({

      vaultId: vault.id,

      amount,

      source,

    })

    onClose()

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-5">

          <h2 className="text-xl font-bold">

            Deposit to Wealth Vault

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            {vault.icon} {vault.title}

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">

              Amount

            </label>

            <input

              type="number"

              required

              value={amount}

              onChange={(e)=>setAmount(e.target.value)}

              className="w-full rounded-lg border border-slate-300 px-4 py-3"

              placeholder="Enter amount"

            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Income Source

            </label>

            <select

              value={source}

              onChange={(e)=>setSource(e.target.value)}

              className="w-full rounded-lg border border-slate-300 px-4 py-3"

            >

              <option>Salary</option>

              <option>Bonus</option>

              <option>Forex Trading</option>

              <option>Freelancing</option>

              <option>Business</option>

              <option>Dividends</option>

              <option>Rental Income</option>

              <option>Gift</option>

              <option>Other</option>

            </select>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">

              Current Balance

            </p>

            <p className="mt-1 text-xl font-bold text-green-600">

              KSh {vault.balance.toLocaleString()}

            </p>

          </div>

          <div className="flex justify-end gap-3">

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

              Deposit

            </button>

          </div>

        </form>

      </div>

    </div>

  )

}