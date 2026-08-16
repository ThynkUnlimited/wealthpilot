import {
  useEffect,
  useMemo,
  useState,
} from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import {
  subscribeToAssets,
  addAsset,
  deleteAsset,
} from "../services/assetService"


export default function Assets() {

  const [assets, setAssets] = useState([])

  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] =
    useState(false)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState("")

  const [form, setForm] = useState({

    name: "",

    category: "Furniture",

    purchaseDate: "",

    purchaseCost: "",

    currentValue: "",

    fundingMethod: "Cash",

    notes: "",

  })


  /* ==========================
     LOAD ASSETS
  ========================== */

  useEffect(() => {

    let unsubscribe

    try {

      unsubscribe =
        subscribeToAssets((data) => {

          setAssets(data)

          setLoading(false)

        })

    } catch (error) {

      console.error(error)

      setError(
        "Unable to load your assets."
      )

      setLoading(false)

    }

    return () => {

      if (unsubscribe) {
        unsubscribe()
      }

    }

  }, [])


  /* ==========================
     TOTAL ASSETS
  ========================== */

  const totalAssets = useMemo(() => {

    return assets.reduce(

      (total, asset) =>

        total +
        Number(asset.currentValue || 0),

      0

    )

  }, [assets])


  /* ==========================
     FORM CHANGE
  ========================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target

    setForm((previous) => ({

      ...previous,

      [name]: value,

    }))

  }


  /* ==========================
     ADD ASSET
  ========================== */

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    if (!form.name.trim()) {

      setError(
        "Please enter the asset name."
      )

      return

    }

    if (
      Number(form.currentValue) < 0
    ) {

      setError(
        "Current value cannot be negative."
      )

      return

    }

    setSaving(true)

    try {

      await addAsset(form)

      setForm({

        name: "",

        category: "Furniture",

        purchaseDate: "",

        purchaseCost: "",

        currentValue: "",

        fundingMethod: "Cash",

        notes: "",

      })

      setShowModal(false)

    } catch (error) {

      console.error(error)

      setError(
        "Unable to save the asset."
      )

    }

    setSaving(false)

  }


  /* ==========================
     DELETE ASSET
  ========================== */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to remove this asset?"
      )

    if (!confirmed) return

    try {

      await deleteAsset(id)

    } catch (error) {

      console.error(error)

      setError(
        "Unable to remove the asset."
      )

    }

  }


  return (

    <AppLayout>

      <PageHeader
        title="Assets"
        subtitle="Track everything you own and its current value."
      />


      {/* ==========================
          SUMMARY
      ========================== */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Assets
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            KSh{" "}

            {totalAssets.toLocaleString()}

          </h2>

        </div>


        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Number of Assets
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {assets.length}

          </h2>

        </div>

      </div>


      {/* ==========================
          ASSETS CARD
      ========================== */}

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold">
              My Assets
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Assets you own.
            </p>

          </div>


          <button

            onClick={() => {

              setError("")

              setShowModal(true)

            }}

            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

          >

            + Add Asset

          </button>

        </div>


        {error && (

          <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950">

            {error}

          </div>

        )}


        {/* ==========================
            LOADING
        ========================== */}

        {loading ? (

          <div className="py-12 text-center text-slate-500">

            Loading assets...

          </div>

        ) : assets.length === 0 ? (

          <div className="mt-8 rounded-xl border border-dashed p-10 text-center">

            <p className="text-lg font-medium">
              No assets recorded yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">

              Add your first asset to start
              calculating your net worth.

            </p>

          </div>

        ) : (

          <div className="mt-6 space-y-4">

            {assets.map((asset) => (

              <div

                key={asset.id}

                className="rounded-xl border p-5 dark:border-slate-700"

              >

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>

                    <h3 className="font-semibold">

                      {asset.name}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {asset.category}

                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-lg font-bold">

                      KSh{" "}

                      {Number(
                        asset.currentValue || 0
                      ).toLocaleString()}

                    </p>

                    <p className="text-xs text-slate-500">

                      Current Value

                    </p>

                  </div>

                </div>


                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">

                  <div>

                    <span className="text-slate-500">
                      Purchase Cost
                    </span>

                    <p className="font-medium">

                      KSh{" "}

                      {Number(
                        asset.purchaseCost || 0
                      ).toLocaleString()}

                    </p>

                  </div>


                  <div>

                    <span className="text-slate-500">
                      Funding
                    </span>

                    <p className="font-medium">

                      {asset.fundingMethod}

                    </p>

                  </div>


                  <div>

                    <span className="text-slate-500">
                      Purchase Date
                    </span>

                    <p className="font-medium">

                      {asset.purchaseDate || "—"}

                    </p>

                  </div>

                </div>


                {asset.notes && (

                  <p className="mt-4 text-sm text-slate-500">

                    {asset.notes}

                  </p>

                )}


                <div className="mt-4 flex justify-end">

                  <button

                    onClick={() =>
                      handleDelete(asset.id)
                    }

                    className="text-sm font-medium text-red-600 hover:underline"

                  >

                    Remove Asset

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* ==========================
          ADD ASSET MODAL
      ========================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Add Asset
                </h2>

                <p className="text-sm text-slate-500">
                  Record something you own.
                </p>

              </div>


              <button

                type="button"

                onClick={() =>
                  setShowModal(false)
                }

                className="text-2xl text-slate-400 hover:text-slate-700"

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
                  Asset Name
                </label>

                <input

                  name="name"

                  value={form.name}

                  onChange={handleChange}

                  placeholder="e.g. Sofa Set"

                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                  required

                />

              </div>


              <div>

                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>

                <select

                  name="category"

                  value={form.category}

                  onChange={handleChange}

                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                >

                  <option>Furniture</option>
                  <option>Vehicle</option>
                  <option>Property</option>
                  <option>Electronics</option>
                  <option>Cash</option>
                  <option>Bank Account</option>
                  <option>Investment</option>
                  <option>Land</option>
                  <option>Other</option>

                </select>

              </div>


              <div>

                <label className="mb-1 block text-sm font-medium">
                  Purchase Date
                </label>

                <input

                  type="date"

                  name="purchaseDate"

                  value={form.purchaseDate}

                  onChange={handleChange}

                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                />

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Purchase Cost
                  </label>

                  <input

                    type="number"

                    min="0"

                    name="purchaseCost"

                    value={form.purchaseCost}

                    onChange={handleChange}

                    placeholder="0"

                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                  />

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Current Value
                  </label>

                  <input

                    type="number"

                    min="0"

                    name="currentValue"

                    value={form.currentValue}

                    onChange={handleChange}

                    placeholder="0"

                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                    required

                  />

                </div>

              </div>


              <div>

                <label className="mb-1 block text-sm font-medium">
                  Funding Method
                </label>

                <select

                  name="fundingMethod"

                  value={form.fundingMethod}

                  onChange={handleChange}

                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                >

                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Loan</option>
                  <option>Mixed</option>
                  <option>Other</option>

                </select>

              </div>


              <div>

                <label className="mb-1 block text-sm font-medium">
                  Notes
                </label>

                <textarea

                  name="notes"

                  value={form.notes}

                  onChange={handleChange}

                  rows="3"

                  placeholder="Optional notes"

                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"

                />

              </div>


              <div className="flex gap-3 pt-2">

                <button

                  type="button"

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="flex-1 rounded-xl border px-4 py-3 font-semibold"

                >

                  Cancel

                </button>


                <button

                  type="submit"

                  disabled={saving}

                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"

                >

                  {saving
                    ? "Saving..."
                    : "Save Asset"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </AppLayout>

  )

}