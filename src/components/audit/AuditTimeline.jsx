import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function AuditTimeline() {

  const { transactions } = useFinance()

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Audit Trail

      </h2>

      <div className="mt-6 space-y-5">

        {transactions.map((item) => (

          <div
            key={`${item.type}-${item.id}`}
            className="border-l-4 border-blue-500 pl-5"
          >

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
                className={`rounded-full px-3 py-1 text-xs font-medium

                ${
                  item.status === "credit-note"

                  ? "bg-amber-100 text-amber-700"

                  : item.status === "reversed"

                  ? "bg-red-100 text-red-700"

                  : "bg-green-100 text-green-700"

                }

                `}
              >

                {item.status || "active"}

              </span>

            </div>

            <div className="mt-3 text-sm text-slate-600">

              <p>

                Category

                <strong>

                  {" "}

                  {item.category}

                </strong>

              </p>

              <p>

                Amount

                <strong>

                  {" "}

                  KSh {item.amount.toLocaleString()}

                </strong>

              </p>

              {item.reason && (

                <p className="mt-2 text-amber-700">

                  Reason:

                  {" "}

                  {item.reason}

                </p>

              )}

            </div>

          </div>

        ))}

      </div>

    </Card>

  )

}