import { useState } from "react"

import { useFinance } from "../../../context/FinanceContext"


export default function AddLoanModal({
  open,
  onClose,
}) {

  const {
    createConnectedLoan,
    assets,
  } = useFinance()


  const [form, setForm] = useState({

    name: "",

    principalAmount: "",

    interestRate: "",

    termMonths: "",

    minimumMonthlyPayment: "",

    lenderName: "",

    startDate:
      new Date()
        .toISOString()
        .split("T")[0],

    assetId: "",

  })


  const [saving, setSaving] = useState(false)

  const [error, setError] = useState("")


  if (!open) {
    return null
  }


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target


    setForm((previous) => ({

      ...previous,

      [name]: value,

    }))

  }


  const handleSubmit = async (event) => {

    event.preventDefault()

    setError("")


    if (!form.name.trim()) {

      setError("Enter the loan name.")

      return

    }


    if (
      !form.principalAmount ||
      Number(form.principalAmount) <= 0
    ) {

      setError("Enter a valid loan amount.")

      return

    }


    if (!form.assetId) {

      setError(
        "Select the asset account receiving the loan."
      )

      return

    }


    try {

      setSaving(true)


      const selectedAsset =
        assets.find(
          (asset) =>
            asset.id === form.assetId
        )


      await createConnectedLoan({

        name:
          form.name,

        principalAmount:
          form.principalAmount,

        interestRate:
          form.interestRate,

        termMonths:
          form.termMonths,

        minimumMonthlyPayment:
          form.minimumMonthlyPayment,

        lenderName:
          form.lenderName,

        startDate:
          form.startDate,

        assetId:
          form.assetId,

        assetName:
          selectedAsset?.name ||
          selectedAsset?.title ||
          "Asset Account",

      })


      setForm({

        name: "",

        principalAmount: "",

        interestRate: "",

        termMonths: "",

        minimumMonthlyPayment: "",

        lenderName: "",

        startDate:
          new Date()
            .toISOString()
            .split("T")[0],

        assetId: "",

      })


      onClose()

    } catch (err) {

      console.error(err)

      setError(
        err.message ||
        "Unable to create loan."
      )

    } finally {

      setSaving(false)

    }

  }


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">

              New Loan

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Create the liability and deposit the loan into an asset account.

            </p>

          </div>


          <button

            type="button"

            onClick={onClose}

            className="text-xl text-slate-400 hover:text-slate-700"

          >

            ×

          </button>

        </div>


        {error && (

          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">

            {error}

          </div>

        )}


        {assets.length === 0 ? (

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">

            <p className="font-semibold">

              No asset accounts found.

            </p>

            <p className="mt-1">

              Create a bank, cash or other asset account first so WealthPilot knows where the loan proceeds were received.

            </p>

          </div>

        ) : (

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <label className="text-sm font-medium">

                  Loan Name

                </label>

                <input

                  name="name"

                  value={form.name}

                  onChange={handleChange}

                  placeholder="e.g. Personal Loan"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>


              <div>

                <label className="text-sm font-medium">

                  Lender

                </label>

                <input

                  name="lenderName"

                  value={form.lenderName}

                  onChange={handleChange}

                  placeholder="e.g. KCB"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>


              <div>

                <label className="text-sm font-medium">

                  Loan Amount

                </label>

                <input

                  type="number"

                  min="0"

                  name="principalAmount"

                  value={form.principalAmount}

                  onChange={handleChange}

                  placeholder="100000"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>


              <div>

                <label className="text-sm font-medium">

                  Interest Rate (%)

                </label>

                <input

                  type="number"

                  min="0"

                  step="0.01"

                  name="interestRate"

                  value={form.interestRate}

                  onChange={handleChange}

                  placeholder="10"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>


              <div>

                <label className="text-sm font-medium">

                  Term (Months)

                </label>

                <input

                  type="number"

                  min="1"

                  name="termMonths"

                  value={form.termMonths}

                  onChange={handleChange}

                  placeholder="12"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>


              <div>

                <label className="text-sm font-medium">

                  Monthly Payment

                </label>

                <input

                  type="number"

                  min="0"

                  name="minimumMonthlyPayment"

                  value={
                    form.minimumMonthlyPayment
                  }

                  onChange={handleChange}

                  placeholder="9000"

                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

                />

              </div>

            </div>


            <div>

              <label className="text-sm font-medium">

                Loan Received Into

              </label>

              <select

                name="assetId"

                value={form.assetId}

                onChange={handleChange}

                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"

              >

                <option value="">

                  Select asset account

                </option>

                {assets.map((asset) => (

                  <option
                    key={asset.id}
                    value={asset.id}
                  >

                    {asset.name ||
                      asset.title ||
                      "Asset"}{" "}

                    — KSh{" "}

                    {Number(
                      asset.value || 0
                    ).toLocaleString()}

                  </option>

                ))}

              </select>

            </div>


            <div>

              <label className="text-sm font-medium">

                Start Date

              </label>

              <input

                type="date"

                name="startDate"

                value={form.startDate}

                onChange={handleChange}

                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"

              />

            </div>


            <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">

              <strong>

                What will happen?

              </strong>

              <p className="mt-1">

                WealthPilot will record the loan as a liability and automatically add the loan amount to the selected asset account.

              </p>

            </div>


            <div className="flex justify-end gap-3">

              <button

                type="button"

                onClick={onClose}

                className="rounded-lg border border-slate-300 px-5 py-2 font-medium"

              >

                Cancel

              </button>


              <button

                type="submit"

                disabled={saving}

                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"

              >

                {saving
                  ? "Creating..."
                  : "Create Loan"}

              </button>

            </div>

          </form>

        )}

      </div>

    </div>

  )

}