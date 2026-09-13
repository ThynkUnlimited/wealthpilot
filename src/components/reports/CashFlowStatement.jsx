function money(value) {

  return `KSh ${Number(value || 0).toLocaleString(
    "en-KE"
  )}`

}


function getPaymentMethod(item) {

  return (
    item.paymentMethod ||
    item.method ||
    "Unspecified"
  )

}


export default function CashFlowStatement({

  income = [],
  expenses = [],
  totalIncome = 0,
  totalExpenses = 0,
  netCashFlow = 0,

}) {


  const incomeMethods = {}

  income.forEach((item) => {

    const method =
      getPaymentMethod(item)

    incomeMethods[method] =
      (incomeMethods[method] || 0) +
      Number(item.amount || 0)

  })


  const expenseMethods = {}

  expenses.forEach((item) => {

    const method =
      getPaymentMethod(item)

    expenseMethods[method] =
      (expenseMethods[method] || 0) +
      Number(item.amount || 0)

  })


  return (

    <div className="space-y-5">


      {/* HEADER */}

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
          Financial Statement
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          Cash Flow Statement
        </h2>

        <p className="mt-1 text-sm text-slate-300">
          Cash received and cash spent during the reporting period
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">


        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

          <p className="text-xs text-emerald-700">
            Cash Inflows
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {money(totalIncome)}
          </p>

        </div>


        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">

          <p className="text-xs text-red-700">
            Cash Outflows
          </p>

          <p className="mt-2 text-2xl font-bold text-red-700">
            {money(totalExpenses)}
          </p>

        </div>


        <div
          className={`rounded-2xl border p-5 ${
            netCashFlow >= 0
              ? "border-blue-100 bg-blue-50"
              : "border-red-100 bg-red-50"
          }`}
        >

          <p className="text-xs text-slate-600">
            Net Cash Movement
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              netCashFlow >= 0
                ? "text-blue-700"
                : "text-red-700"
            }`}
          >
            {money(netCashFlow)}
          </p>

        </div>

      </div>


      {/* CASH FLOW TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <h3 className="font-bold text-slate-900">
            Statement of Cash Flows
          </h3>

        </div>


        <div className="p-5">


          {/* OPERATING INFLOWS */}

          <div className="mb-8">

            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-emerald-700">
                Cash Inflows
              </h4>

              <span className="font-bold text-emerald-700">
                {money(totalIncome)}
              </span>

            </div>


            {Object.keys(incomeMethods).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No cash inflows recorded.
              </p>

            ) : (

              Object.entries(incomeMethods).map(
                ([method, amount]) => (

                  <div
                    key={method}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {method}
                    </span>

                    <span className="font-medium text-emerald-700">
                      + {money(amount)}
                    </span>

                  </div>

                )
              )

            )}

          </div>


          {/* CASH OUTFLOWS */}

          <div className="mb-8">

            <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">

              <h4 className="font-bold text-red-700">
                Cash Outflows
              </h4>

              <span className="font-bold text-red-700">
                {money(totalExpenses)}
              </span>

            </div>


            {Object.keys(expenseMethods).length === 0 ? (

              <p className="py-3 text-sm text-slate-400">
                No cash outflows recorded.
              </p>

            ) : (

              Object.entries(expenseMethods).map(
                ([method, amount]) => (

                  <div
                    key={method}
                    className="flex justify-between border-b border-slate-50 py-2 text-sm"
                  >

                    <span className="text-slate-600">
                      {method}
                    </span>

                    <span className="font-medium text-red-700">
                      − {money(amount)}
                    </span>

                  </div>

                )
              )

            )}

          </div>


          {/* NET CASH */}

          <div className="rounded-xl bg-slate-900 p-5 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-slate-400">
                  NET CASH MOVEMENT
                </p>

                <p className="mt-1 text-lg font-bold">
                  Operating Cash Flow
                </p>

              </div>

              <p
                className={`text-2xl font-bold ${
                  netCashFlow >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {money(netCashFlow)}
              </p>

            </div>

          </div>


          {/* NOTE */}

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

            <p className="text-xs font-semibold text-blue-700">
              Reporting note
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700/80">
              This statement currently derives cash movement from
              recorded income and expenses. WealthPilot's loan
              transactions already record loan disbursements and
              repayments separately; we will connect those financing
              movements into this statement in the next reporting
              upgrade.
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}