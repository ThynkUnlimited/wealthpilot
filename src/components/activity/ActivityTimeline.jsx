import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function ActivityTimeline() {

  const { transactions } = useFinance()

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Recent Activity

      </h2>

      <div className="mt-6 space-y-5">

        {transactions.map((item) => (

          <div
            key={`${item.type}-${item.id}`}
            className="flex items-start gap-4 border-b pb-5"
          >

            <div className="mt-1 h-3 w-3 rounded-full bg-blue-600"></div>

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">

                    {item.title}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {item.date}

                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === "credit-note"
                      ? "bg-amber-100 text-amber-700"
                      : item.status === "reversed"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status || "active"}
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-600">

                {item.type.toUpperCase()} • {item.category}

              </p>

              <p className="mt-1 font-semibold">

                KSh {item.amount.toLocaleString()}

              </p>

              {item.reason && (

                <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">

                  Reason: {item.reason}

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </Card>

  )

}