import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function AIInsight() {

  const {
    income,
    expenses,
    budgets,
    savingsGoals,
    wealthVaults,

    totalIncome,
    totalExpenses,
    totalSavings,
    totalVaultBalance,

    balance,
    budgetUsage,
  } = useFinance()


  /* =========================================
     NO FINANCIAL DATA YET
  ========================================= */

  if (
    income.length === 0 &&
    expenses.length === 0 &&
    budgets.length === 0 &&
    wealthVaults.length === 0
  ) {

    return (

      <Card>

        <div className="flex items-start gap-3">

          <div className="text-2xl">
            🤖
          </div>

          <div>

            <h3 className="text-sm font-semibold">
              AI Financial Coach
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">

              Welcome to WealthPilot. Add your income,
              expenses, budgets, or Wealth Vaults and
              your Financial Coach will start analyzing
              your financial position.

            </p>

          </div>

        </div>

      </Card>

    )

  }


  /* =========================================
     CALCULATIONS
  ========================================= */

  const expenseByCategory = {}

  expenses.forEach((expense) => {

    const category =
      expense.category ||
      "Other"

    expenseByCategory[category] =
      (expenseByCategory[category] || 0) +
      Number(expense.amount || 0)

  })


  const highestExpenseCategory =
    Object.entries(expenseByCategory)
      .sort((a, b) => b[1] - a[1])[0]


  const savingsPercentage =
    totalIncome > 0

      ? Math.round(
          (totalSavings / totalIncome) * 100
        )

      : 0


  const vaultPercentage =
    totalIncome > 0

      ? Math.round(
          (totalVaultBalance / totalIncome) * 100
        )

      : 0


  /* =========================================
     AI MESSAGE
  ========================================= */

  let icon = "🤖"

  let title = "AI Financial Coach"

  let message = ""


  /* =========================================
     1. NO INCOME
  ========================================= */

  if (totalIncome <= 0) {

    icon = "💡"

    message =
      "You haven't recorded any income yet. " +
      "Add your salary or other income so WealthPilot " +
      "can measure your spending, savings and financial position."

  }


  /* =========================================
     2. SPENDING MORE THAN INCOME
  ========================================= */

  else if (totalExpenses > totalIncome) {

    icon = "🚨"

    const deficit =
      totalExpenses - totalIncome

    message =
      `Your recorded expenses are KSh ${deficit.toLocaleString()} ` +
      `higher than your recorded income. ` +
      "This means your current cash position is negative. " +
      "Review your largest expenses and reduce non-essential spending."

  }


  /* =========================================
     3. VERY HIGH BUDGET USAGE
  ========================================= */

  else if (budgetUsage >= 90) {

    icon = "⚠️"

    message =
      `You have used ${budgetUsage}% of your recorded budget. ` +
      "You are approaching your monthly spending limit. " +
      "Consider slowing discretionary spending for the remainder of the month."

  }


  /* =========================================
     4. HIGH EXPENSE CATEGORY
  ========================================= */

  else if (highestExpenseCategory) {

    const [category, amount] =
      highestExpenseCategory

    const percentage =
      totalExpenses > 0

        ? Math.round(
            (amount / totalExpenses) * 100
          )

        : 0


    if (percentage >= 40) {

      icon = "🔎"

      message =
        `${category} is currently your largest expense category, ` +
        `accounting for ${percentage}% of your recorded spending ` +
        `(KSh ${amount.toLocaleString()}). ` +
        "Keep an eye on this category to make sure it remains within your plan."

    }

  }


  /* =========================================
     5. LOW SAVINGS
  ========================================= */

  if (
    !message &&
    totalIncome > 0 &&
    savingsPercentage < 10
  ) {

    icon = "💰"

    message =
      `Your recorded savings are currently ${savingsPercentage}% ` +
      "of your income. Consider setting aside a portion of each " +
      "income payment before increasing discretionary spending."

  }


  /* =========================================
     6. WEALTH VAULT
  ========================================= */

  if (
    !message &&
    wealthVaults.length > 0 &&
    vaultPercentage < 10
  ) {

    icon = "🛡️"

    message =
      `Your Wealth Vaults currently hold KSh ${totalVaultBalance.toLocaleString()}, ` +
      `which is about ${vaultPercentage}% of your recorded income. ` +
      "Consider making consistent contributions toward your financial protection goals."

  }


  /* =========================================
     7. POSITIVE CASH POSITION
  ========================================= */

  if (!message && balance > 0) {

    icon = "✅"

    message =
      `You currently have a positive recorded balance of ` +
      `KSh ${balance.toLocaleString()}. ` +
      "Keep monitoring your expenses and directing part of your surplus toward savings or Wealth Vault goals."

  }


  /* =========================================
     8. FALLBACK
  ========================================= */

  if (!message) {

    icon = "🤖"

    message =
      "Your financial records are being monitored. " +
      "Keep your income, expenses and budgets updated " +
      "so WealthPilot can provide more useful financial guidance."

  }


  /* =========================================
     DISPLAY
  ========================================= */

  return (

    <Card>

      <div className="flex items-start gap-3">

        <div className="text-2xl">
          {icon}
        </div>

        <div className="min-w-0">

          <h3 className="text-sm font-semibold">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">

            {message}

          </p>

        </div>

      </div>

    </Card>

  )

}