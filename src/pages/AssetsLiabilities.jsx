import { useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"
import Card from "../components/ui/Card"

import { useFinance } from "../context/FinanceContext"

export default function AssetsLiabilities() {

  const {
    assets,
    liabilities,
    totalAssets,
    totalLiabilities,
    netWorth,
    addAsset,
    addLiability,
  } = useFinance()


  const [showAssetForm, setShowAssetForm] = useState(false)

  const [showLiabilityForm, setShowLiabilityForm] =
    useState(false)


  const [assetForm, setAssetForm] = useState({

    name: "",

    category: "Cash",

    value: "",

  })


  const [liabilityForm, setLiabilityForm] =
    useState({

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

    })


  /* =====================================
      ADD ASSET
  ===================================== */

  const handleAddAsset = async (event) => {

    event.preventDefault()

    if (
      !assetForm.name ||
      !assetForm.value
    ) {
      return
    }

    try {

      await addAsset({

        name: assetForm.name,

        category: assetForm.category,

        value: Number(assetForm.value),

      })

      setAssetForm({

        name: "",

        category: "Cash",

        value: "",

      })

      setShowAssetForm(false)

    } catch (error) {

      console.error(
        "Failed to add asset:",
        error
      )

    }

  }


  /* =====================================
      ADD LIABILITY
  ===================================== */

  const handleAddLiability = async (event) => {

    event.preventDefault()

    if (
      !liabilityForm.name ||
      !liabilityForm.principalAmount
    ) {
      return
    }

    try {

      await addLiability({

        name: liabilityForm.name,

        principalAmount:
          Number(
            liabilityForm.principalAmount
          ),

        currentBalance:
          Number(
            liabilityForm.principalAmount
          ),

        interestRate:
          Number(
            liabilityForm.interestRate || 0
          ),

        termMonths:
          Number(
            liabilityForm.termMonths || 0
          ),

        minimumMonthlyPayment:
          Number(
            liabilityForm.minimumMonthlyPayment || 0
          ),

        lenderName:
          liabilityForm.lenderName,

        startDate:
          liabilityForm.startDate,

      })

      setLiabilityForm({

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

      })

      setShowLiabilityForm(false)

    } catch (error) {

      console.error(
        "Failed to add liability:",
        error
      )

    }

  }


  const formatMoney = (amount) => {

    return `KSh ${Number(
      amount || 0
    ).toLocaleString()}`

  }


  return (

    <AppLayout>

      <PageHeader

        title="Assets & Liabilities"

        subtitle="Track what you own, what you owe, and your true net worth."

      />


      <div className="space-y-6">


        {/* =================================
            SUMMARY
        ================================= */}

        <div className="grid gap-4 md:grid-cols-3">

          <Card>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Total Assets

            </p>

            <h2 className="mt-2 text-2xl font-bold text-emerald-600">

              {formatMoney(totalAssets)}

            </h2>

          </Card>


          <Card>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Total Liabilities

            </p>

            <h2 className="mt-2 text-2xl font-bold text-red-600">

              {formatMoney(totalLiabilities)}

            </h2>

          </Card>


          <Card>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Net Worth

            </p>

            <h2
              className={`mt-2 text-2xl font-bold ${
                netWorth >= 0
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >

              {formatMoney(netWorth)}

            </h2>

          </Card>

        </div>


        {/* =================================
            ACTIONS
        ================================= */}

        <div className="flex flex-wrap gap-3">

          <button

            onClick={() =>
              setShowAssetForm(
                !showAssetForm
              )
            }

            className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"

          >

            + Add Asset

          </button>


          <button

            onClick={() =>
              setShowLiabilityForm(
                !showLiabilityForm
              )
            }

            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"

          >

            + Add Liability

          </button>

        </div>


        {/* =================================
            ASSET FORM
        ================================= */}

        {showAssetForm && (

          <Card>

            <h3 className="text-lg font-bold">

              Add Asset

            </h3>


            <form
              onSubmit={handleAddAsset}
              className="mt-5 grid gap-4 md:grid-cols-3"
            >

              <input

                type="text"

                placeholder="Asset name"

                value={assetForm.name}

                onChange={(event) =>
                  setAssetForm({

                    ...assetForm,

                    name:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <select

                value={assetForm.category}

                onChange={(event) =>
                  setAssetForm({

                    ...assetForm,

                    category:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              >

                <option>Cash</option>

                <option>Bank Account</option>

                <option>Mobile Money</option>

                <option>Property</option>

                <option>Furniture</option>

                <option>Vehicle</option>

                <option>Investment</option>

                <option>Other</option>

              </select>


              <input

                type="number"

                min="0"

                placeholder="Current value"

                value={assetForm.value}

                onChange={(event) =>
                  setAssetForm({

                    ...assetForm,

                    value:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <div className="md:col-span-3">

                <button

                  type="submit"

                  className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"

                >

                  Save Asset

                </button>

              </div>

            </form>

          </Card>

        )}


        {/* =================================
            LIABILITY FORM
        ================================= */}

        {showLiabilityForm && (

          <Card>

            <h3 className="text-lg font-bold">

              Add Liability

            </h3>


            <form
              onSubmit={handleAddLiability}
              className="mt-5 grid gap-4 md:grid-cols-2"
            >

              <input

                type="text"

                placeholder="Loan / liability name"

                value={liabilityForm.name}

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    name:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="text"

                placeholder="Lender name"

                value={liabilityForm.lenderName}

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    lenderName:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="number"

                min="0"

                placeholder="Principal amount"

                value={
                  liabilityForm.principalAmount
                }

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    principalAmount:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="number"

                min="0"

                step="0.01"

                placeholder="Interest rate %"

                value={
                  liabilityForm.interestRate
                }

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    interestRate:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="number"

                min="0"

                placeholder="Term in months"

                value={
                  liabilityForm.termMonths
                }

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    termMonths:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="number"

                min="0"

                placeholder="Minimum monthly payment"

                value={
                  liabilityForm.minimumMonthlyPayment
                }

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    minimumMonthlyPayment:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <input

                type="date"

                value={
                  liabilityForm.startDate
                }

                onChange={(event) =>
                  setLiabilityForm({

                    ...liabilityForm,

                    startDate:
                      event.target.value,

                  })
                }

                className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"

              />


              <div className="md:col-span-2">

                <button

                  type="submit"

                  className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"

                >

                  Save Liability

                </button>

              </div>

            </form>

          </Card>

        )}


        {/* =================================
            ASSETS
        ================================= */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold">

                Assets

              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">

                Things you own that have financial value.

              </p>

            </div>

            <span className="font-semibold text-emerald-600">

              {formatMoney(totalAssets)}

            </span>

          </div>


          <div className="mt-5 space-y-3">

            {assets.length === 0 ? (

              <p className="py-6 text-center text-sm text-slate-500">

                No assets recorded yet.

              </p>

            ) : (

              assets.map((asset) => (

                <div

                  key={asset.id}

                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800"

                >

                  <div>

                    <p className="font-semibold">

                      {asset.name ||
                        asset.title ||
                        "Asset"}

                    </p>

                    <p className="text-xs text-slate-500">

                      {asset.category ||
                        "Other"}

                    </p>

                  </div>


                  <p className="font-bold text-emerald-600">

                    {formatMoney(
                      asset.value
                    )}

                  </p>

                </div>

              ))

            )}

          </div>

        </Card>


        {/* =================================
            LIABILITIES
        ================================= */}

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold">

                Liabilities

              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">

                Money you currently owe.

              </p>

            </div>

            <span className="font-semibold text-red-600">

              {formatMoney(
                totalLiabilities
              )}

            </span>

          </div>


          <div className="mt-5 space-y-3">

            {liabilities.length === 0 ? (

              <p className="py-6 text-center text-sm text-slate-500">

                No liabilities recorded yet.

              </p>

            ) : (

              liabilities.map((liability) => (

                <div

                  key={liability.id}

                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800"

                >

                  <div>

                    <p className="font-semibold">

                      {liability.name ||
                        "Liability"}

                    </p>

                    <p className="text-xs text-slate-500">

                      {liability.lenderName ||
                        "Lender not specified"}

                    </p>

                  </div>


                  <p className="font-bold text-red-600">

                    {formatMoney(

                      liability.currentBalance

                    )}

                  </p>

                </div>

              ))

            )}

          </div>

        </Card>

      </div>

    </AppLayout>

  )

}