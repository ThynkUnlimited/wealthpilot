import { createContext, useContext, useMemo, useState } from "react"
import { initialFinanceData } from "../data/financeData"

const FinanceContext = createContext()

export function FinanceProvider({ children }) {

  /* =====================================
      STATE
  ====================================== */

  const [income, setIncome] = useState(initialFinanceData.income)

  const [expenses, setExpenses] = useState(initialFinanceData.expenses)

  const [budgets, setBudgets] = useState(initialFinanceData.budgets)

  const [wealthVaults, setWealthVaults] = useState(
    initialFinanceData.wealthVaults
  )

  const [vaultTransactions, setVaultTransactions] = useState([])

  // Temporary until Savings page is migrated
  const [savingsGoals] = useState(initialFinanceData.savingsGoals)

  const [investments] = useState(initialFinanceData.investments)

  /* =====================================
      EXPENSE FUNCTIONS
  ====================================== */

  const addExpense = (expense) => {

    setExpenses(prev => [

      {
        id: Date.now(),
        ...expense,
        amount: Number(expense.amount),
        status: "active",
      },

      ...prev,

    ])

  }

  /* =====================================
      INCOME FUNCTIONS
  ====================================== */

  const addIncome = (entry) => {

    setIncome(prev => [

      {
        id: Date.now(),
        ...entry,
        amount: Number(entry.amount),
        status: "active",
      },

      ...prev,

    ])

  }

  /* =====================================
      WEALTH VAULT
  ====================================== */

  const addWealthVault = (vault) => {

    setWealthVaults(prev => [

      ...prev,

      {

        id: Date.now(),

        title: vault.title,

        target: Number(vault.target),

        balance: 0,

        monthlyContribution: Number(
          vault.monthlyContribution || 0
        ),

        priority: vault.priority,

        icon: vault.icon,

        createdAt: new Date().toISOString().split("T")[0],

      },

    ])

  }

  const depositToVault = ({ vaultId, amount, source }) => {

    const deposit = Number(amount)

    if (deposit <= 0) return

    setWealthVaults(prev =>

      prev.map(vault =>

        vault.id === vaultId

          ? {

              ...vault,

              balance: vault.balance + deposit,

            }

          : vault

      )

    )

    setVaultTransactions(prev => [

      {

        id: Date.now(),

        vaultId,

        amount: deposit,

        source,

        date: new Date().toISOString().split("T")[0],

      },

      ...prev,

    ])

  }

  /* =====================================
      CREDIT NOTES
  ====================================== */

  const issueCreditNote = ({ type, id, reason }) => {

    if (type === "income") {

      const original = income.find(item => item.id === id)

      if (!original) return

      const creditNote = {

        id: Date.now(),

        title: `Credit Note - ${original.title}`,

        category: original.category,

        amount: -Math.abs(original.amount),

        date: new Date().toISOString().split("T")[0],

        status: "credit-note",

        reason,

        referenceId: original.id,

      }

      setIncome(prev => [

        creditNote,

        ...prev.map(item =>

          item.id === id

            ? {

                ...item,

                status: "reversed",

              }

            : item

        ),

      ])

    }

    if (type === "expense") {

      const original = expenses.find(item => item.id === id)

      if (!original) return

      const creditNote = {

        id: Date.now(),

        title: `Credit Note - ${original.title}`,

        category: original.category,

        amount: -Math.abs(original.amount),

        date: new Date().toISOString().split("T")[0],

        status: "credit-note",

        reason,

        referenceId: original.id,

      }

      setExpenses(prev => [

        creditNote,

        ...prev.map(item =>

          item.id === id

            ? {

                ...item,

                status: "reversed",

              }

            : item

        ),

      ])

    }

  }

  /* =====================================
      TOTALS
  ====================================== */

  const totalIncome = useMemo(() => {

    return income.reduce(

      (sum, item) => sum + item.amount,

      0

    )

  }, [income])

  const totalExpenses = useMemo(() => {

    return expenses.reduce(

      (sum, item) => sum + item.amount,

      0

    )

  }, [expenses])

  const totalSavings = useMemo(() => {

    return savingsGoals.reduce(

      (sum, goal) => sum + goal.saved,

      0

    )

  }, [savingsGoals])

  const totalVaultBalance = useMemo(() => {

    return wealthVaults.reduce(

      (sum, vault) => sum + vault.balance,

      0

    )

  }, [wealthVaults])

  const totalBudget = useMemo(() => {

    return budgets.reduce(

      (sum, item) => sum + item.budget,

      0

    )

  }, [budgets])

  const totalSpentBudget = useMemo(() => {

    return budgets.reduce(

      (sum, item) => sum + item.spent,

      0

    )

  }, [budgets])

  const balance = totalIncome - totalExpenses

  const savingsRate =

    totalIncome > 0

      ? Math.round((totalSavings / totalIncome) * 100)

      : 0

  const wealthProtectionRate =

    totalIncome > 0

      ? Math.round((totalVaultBalance / totalIncome) * 100)

      : 0

  const budgetUsage =

    totalBudget > 0

      ? Math.round((totalSpentBudget / totalBudget) * 100)

      : 0

  /* =====================================
      TRANSACTIONS
  ====================================== */

  const transactions = useMemo(() => {

    return [

      ...income.map(item => ({

        ...item,

        type: "income",

      })),

      ...expenses.map(item => ({

        ...item,

        type: "expense",

      })),

    ].sort(

      (a, b) => new Date(b.date) - new Date(a.date)

    )

  }, [income, expenses])

  /* =====================================
      CONTEXT
  ====================================== */

  const value = {

    income,

    expenses,

    budgets,

    wealthVaults,

    vaultTransactions,

    savingsGoals,

    investments,

    transactions,

    addIncome,

    addExpense,

    addWealthVault,

    depositToVault,

    issueCreditNote,

    totalIncome,

    totalExpenses,

    totalSavings,

    totalVaultBalance,

    balance,

    savingsRate,

    wealthProtectionRate,

    budgetUsage,

  }

  return (

    <FinanceContext.Provider value={value}>

      {children}

    </FinanceContext.Provider>

  )

}

export function useFinance() {

  return useContext(FinanceContext)

}