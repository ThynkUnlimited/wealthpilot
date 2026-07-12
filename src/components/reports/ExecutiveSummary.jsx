import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function ExecutiveSummary() {

  const {

    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
    budgetUsage,

  } = useFinance()

  return (

    <Card>

      <h2 className="text-xl font-semibold">

        Executive Summary

      </h2>

      <div className="mt-5 space-y-3">

        <p>

          Total Income

          <strong>

            {" "}KSh {totalIncome.toLocaleString()}

          </strong>

        </p>

        <p>

          Total Expenses

          <strong>

            {" "}KSh {totalExpenses.toLocaleString()}

          </strong>

        </p>

        <p>

          Net Balance

          <strong>

            {" "}KSh {balance.toLocaleString()}

          </strong>

        </p>

        <p>

          Savings Rate

          <strong>

            {" "}{savingsRate}%

          </strong>

        </p>

        <p>

          Budget Usage

          <strong>

            {" "}{budgetUsage}%

          </strong>

        </p>

      </div>

    </Card>

  )

}