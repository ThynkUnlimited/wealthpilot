import Card from "../../../components/ui/Card"

import { useFinance } from "../../../context/FinanceContext"

import {
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react"

export default function RecentActivity() {

  const { transactions } = useFinance()

  const recent = transactions.slice(0, 6)

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-bold">

            Recent Activity

          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">

            Your latest financial transactions.

          </p>

        </div>

      </div>

      <div className="mt-6">

        {recent.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">

            <p className="text-slate-500">

              No transactions recorded yet.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {recent.map((item) => {

              const income = item.type === "income"

              return (

                <div

                  key={item.id}

                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow dark:border-slate-700 dark:bg-slate-800"

                >

                  <div className="flex items-center gap-4">

                    <div

                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        income
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}

                    >

                      {income ? (

                        <ArrowDownCircle

                          size={22}

                          className="text-green-600"

                        />

                      ) : (

                        <ArrowUpCircle

                          size={22}

                          className="text-red-600"

                        />

                      )}

                    </div>

                    <div>

                      <h4 className="font-semibold">

                        {item.title}

                      </h4>

                      <p className="text-sm text-slate-500">

                        {item.category || "General"}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p

                      className={`font-bold ${
                        income
                          ? "text-green-600"
                          : "text-red-600"
                      }`}

                    >

                      {income ? "+" : "-"}

                      KES {Number(item.amount).toLocaleString()}

                    </p>

                    <p className="text-xs text-slate-500">

                      {item.date}

                    </p>

                  </div>

                </div>

              )

            })}

          </div>

        )}

      </div>

    </Card>

  )

}