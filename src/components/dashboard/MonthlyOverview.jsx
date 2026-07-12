import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function MonthlyOverview() {

  const {

    totalIncome,

    totalExpenses,

    balance,

  } = useFinance()

  return (

    <Card>

      <h3 className="text-sm font-semibold">

        This Month

      </h3>

      <div className="mt-4 space-y-4">

        <div className="flex justify-between">

          <span className="text-sm">

            Income

          </span>

          <span className="font-semibold text-green-600">

            KSh {totalIncome.toLocaleString()}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm">

            Expenses

          </span>

          <span className="font-semibold text-red-600">

            KSh {totalExpenses.toLocaleString()}

          </span>

        </div>

        <div className="border-t pt-4 flex justify-between">

          <span className="font-semibold">

            Remaining

          </span>

          <span className="font-bold text-blue-600">

            KSh {balance.toLocaleString()}

          </span>

        </div>

      </div>

    </Card>

  )

}