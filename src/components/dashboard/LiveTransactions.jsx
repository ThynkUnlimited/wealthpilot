import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function LiveTransactions() {

  const { transactions } = useFinance()

  return (

    <Card>

      <h2 className="text-sm font-semibold">

        Recent Transactions

      </h2>

      <div className="mt-5 space-y-4">

        {transactions.slice(0, 8).map((item) => (

          <div
            key={`${item.type}-${item.id}`}
            className="flex items-center justify-between border-b border-slate-100 pb-3"
          >

            <div>

              <p className="text-sm font-medium">

                {item.title}

              </p>

              <p className="text-xs text-slate-500">

                {item.category}

              </p>

            </div>

            <div className="text-right">

              <p
                className={`text-sm font-semibold ${
                  item.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >

                {item.type === "income" ? "+" : "-"}

                KSh {item.amount.toLocaleString()}

              </p>

              <p className="text-xs text-slate-400">

                {item.date}

              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>

  )

}