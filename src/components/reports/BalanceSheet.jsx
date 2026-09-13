function money(value) {

  return `KSh ${Number(value || 0).toLocaleString(
    "en-KE"
  )}`

}


function assetValue(asset) {

  return Number(
    asset.value ??
    asset.currentValue ??
    0
  )

}


function liabilityValue(liability) {

  return Number(
    liability.currentBalance ??
    liability.outstandingBalance ??
    0
  )

}


export default function BalanceSheet({

  assets = [],
  liabilities = [],
  totalAssets = 0,
  totalLiabilities = 0,
  netWorth = 0,

}) {


  const assetGroups = {}

  assets.forEach((asset) => {

    const category =
      asset.category ||
      "Other Assets"

    assetGroups[category] =
      (assetGroups[category] || 0) +
      assetValue(asset)

  })


  const liabilityGroups = {}

  liabilities.forEach((liability) => {

    const category =
      liability.type ||
      "Other Liabilities"

    liabilityGroups[category] =
      (liabilityGroups[category] || 0) +
      liabilityValue(liability)

  })


  const accountingEquation =
    totalAssets -
    totalLiabilities -
    netWorth


  const balanced =
    Math.abs(accountingEquation) < 0.01


  return (

    <div className="space-y-5">


      {/* HEADER */}

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

        <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
          Financial Statement
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          Balance Sheet
        </h2>

        <p className="mt-1 text-sm text-slate-300">
          Statement of financial position
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">


        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

          <p className="text-xs text-emerald-700">
            Total Assets
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {money(totalAssets)}
          </p>

        </div>


        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">

          <p className="text-xs text-red-700">
            Total Liabilities
          </p>

          <p className="mt-2 text-2xl font-bold text-red-700">
            {money(totalLiabilities)}
          </p>

        </div>


        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">

          <p className="text-xs text-violet-700">
            Net Worth / Equity
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-700">
            {money(netWorth)}
          </p>

        </div>

      </div>


      {/* BALANCE CHECK */}

      <div
        className={`rounded-2xl border p-4 ${
          balanced
            ? "border-emerald-200 bg-emerald-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >

        <div className="flex items-center justify-between">

          <div>

            <p
              className={`text-sm font-bold ${
                balanced
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`}
            >
              {balanced
                ? "Balance Sheet Balanced"
                : "Balance Sheet Review Required"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Assets = Liabilities + Net Worth
            </p>

          </div>

          <div
            className={`text-lg font-bold ${
              balanced
                ? "text-emerald-600"
                : "text-amber-600"
            }`}
          >
            {balanced ? "✓" : "!"}
          </div>

        </div>

      </div>


      {/* STATEMENT */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h3 className="font-bold text-slate-900">
            Statement of Financial Position
          </h3>

        </div>


        <div className="grid grid-cols-1 gap-8 p-5 lg:grid-cols-2">


          {/* ASSETS */}

          <div>

            <div className="mb-3 flex justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-emerald-700">
                Assets
              </h4>

              <span className="font-bold text-emerald-700">
                {money(totalAssets)}
              </span>

            </div>


            {Object.keys(assetGroups).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No assets recorded.
              </p>

            ) : (

              Object.entries(assetGroups).map(
                ([category, amount]) => (

                  <div
                    key={category}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {category}
                    </span>

                    <span className="font-medium">
                      {money(amount)}
                    </span>

                  </div>

                )
              )

            )}


            <div className="mt-4 flex justify-between rounded-xl bg-emerald-50 p-3">

              <span className="font-bold text-emerald-700">
                Total Assets
              </span>

              <span className="font-bold text-emerald-700">
                {money(totalAssets)}
              </span>

            </div>

          </div>


          {/* LIABILITIES + EQUITY */}

          <div>

            <div className="mb-3 flex justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-red-700">
                Liabilities
              </h4>

              <span className="font-bold text-red-700">
                {money(totalLiabilities)}
              </span>

            </div>


            {Object.keys(liabilityGroups).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No liabilities recorded.
              </p>

            ) : (

              Object.entries(liabilityGroups).map(
                ([category, amount]) => (

                  <div
                    key={category}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {category}
                    </span>

                    <span className="font-medium">
                      {money(amount)}
                    </span>

                  </div>

                )
              )

            )}


            <div className="mt-6 mb-3 border-b border-slate-200 pb-2">

              <div className="flex justify-between">

                <h4 className="font-bold text-violet-700">
                  Equity / Net Worth
                </h4>

                <span className="font-bold text-violet-700">
                  {money(netWorth)}
                </span>

              </div>

            </div>


            <div className="rounded-xl bg-slate-900 p-4 text-white">

              <div className="flex justify-between">

                <span className="font-semibold">
                  Liabilities + Equity
                </span>

                <span className="font-bold">
                  {money(
                    totalLiabilities +
                    netWorth
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}