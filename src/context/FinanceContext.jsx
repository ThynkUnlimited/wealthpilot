import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"

import { onAuthStateChanged } from "firebase/auth"

import { auth } from "../firebase/firebase"


/* =====================================
   INCOME SERVICE
===================================== */

import {
  subscribeToIncome,
  addIncome as saveIncome,
  updateIncome as updateIncomeService,
  deleteIncome as deleteIncomeService,
} from "../services/incomeService"


/* =====================================
   EXPENSE SERVICE
===================================== */

import {
  subscribeToExpenses,
  addExpense as saveExpense,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService"


/* =====================================
   BUDGET SERVICE
===================================== */

import {
  subscribeToBudgets,
  addBudget as saveBudget,
  updateBudget as updateBudgetService,
  deleteBudget as deleteBudgetService,
} from "../services/budgetService"


/* =====================================
   ASSET SERVICE
===================================== */

import {
  subscribeToAssets,
  addAsset as saveAsset,
  updateAsset as updateAssetService,
  deleteAsset as deleteAssetService,
} from "../services/assetService"


/* =====================================
   LIABILITY SERVICE
===================================== */

import {
  subscribeToLiabilities,
  addLiability as saveLiability,
  updateLiability as updateLiabilityService,
  deleteLiability as deleteLiabilityService,
  createLoan as createLiabilityService,
  repayLoan as repayLiabilityService,
} from "../services/liabilityService"


const FinanceContext = createContext()


export function FinanceProvider({ children }) {

  /* =====================================
      CORE STATE
  ===================================== */

  const [income, setIncome] = useState([])

  const [expenses, setExpenses] = useState([])

  const [budgets, setBudgets] = useState([])

  const [assets, setAssets] = useState([])

  const [liabilities, setLiabilities] = useState([])

  const [loading, setLoading] = useState(true)


  /* =====================================
      WEALTH VAULT
  ===================================== */

  const [wealthVaults, setWealthVaults] =
    useState([])

  const [vaultTransactions, setVaultTransactions] =
    useState([])


  /* =====================================
      SAVINGS / INVESTMENTS
  ===================================== */

  const [savingsGoals] = useState([])

  const [investments] = useState([])


  /* =====================================
      REALTIME FIRESTORE
  ===================================== */

  useEffect(() => {

    let unsubscribeIncome = () => {}

    let unsubscribeExpenses = () => {}

    let unsubscribeBudgets = () => {}

    let unsubscribeAssets = () => {}

    let unsubscribeLiabilities = () => {}


    const unsubscribeAuth =
      onAuthStateChanged(

        auth,

        (user) => {

          /* ==========================
             USER LOGGED OUT
          ========================== */

          if (!user) {

            unsubscribeIncome()

            unsubscribeExpenses()

            unsubscribeBudgets()

            unsubscribeAssets()

            unsubscribeLiabilities()


            setIncome([])

            setExpenses([])

            setBudgets([])

            setAssets([])

            setLiabilities([])

            setLoading(false)

            return

          }


          /* ==========================
             INCOME
          ========================== */

          unsubscribeIncome =
            subscribeToIncome((data) => {

              setIncome(data)

              setLoading(false)

            })


          /* ==========================
             EXPENSES
          ========================== */

          unsubscribeExpenses =
            subscribeToExpenses((data) => {

              setExpenses(data)

            })


          /* ==========================
             BUDGETS
          ========================== */

          unsubscribeBudgets =
            subscribeToBudgets((data) => {

              setBudgets(data)

            })


          /* ==========================
             ASSETS
          ========================== */

          unsubscribeAssets =
            subscribeToAssets((data) => {

              setAssets(data)

            })


          /* ==========================
             LIABILITIES
          ========================== */

          unsubscribeLiabilities =
            subscribeToLiabilities((data) => {

              setLiabilities(data)

            })

        }

      )


    return () => {

      unsubscribeIncome()

      unsubscribeExpenses()

      unsubscribeBudgets()

      unsubscribeAssets()

      unsubscribeLiabilities()

      unsubscribeAuth()

    }

  }, [])


  /* =====================================
      INCOME
  ===================================== */

  const addIncome = async (entry) => {

    await saveIncome(entry)

  }


  const updateIncome = async (
    id,
    data
  ) => {

    await updateIncomeService(
      id,
      data
    )

  }


  const deleteIncome = async (id) => {

    await deleteIncomeService(id)

  }


  /* =====================================
      EXPENSES
  ===================================== */

  const addExpense = async (expense) => {

    await saveExpense(expense)

  }


  const updateExpense = async (
    id,
    data
  ) => {

    await updateExpenseService(
      id,
      data
    )

  }


  const deleteExpense = async (id) => {

    await deleteExpenseService(id)

  }


  /* =====================================
      BUDGETS
  ===================================== */

  const addBudget = async (budget) => {

    await saveBudget(budget)

  }


  const updateBudget = async (
    id,
    data
  ) => {

    await updateBudgetService(
      id,
      data
    )

  }


  const deleteBudget = async (id) => {

    await deleteBudgetService(id)

  }


  /* =====================================
      ASSETS
  ===================================== */

  const addAsset = async (asset) => {

    await saveAsset(asset)

  }


  const updateAsset = async (
    id,
    data
  ) => {

    await updateAssetService(
      id,
      data
    )

  }


  const deleteAsset = async (id) => {

    await deleteAssetService(id)

  }


  /* =====================================
      LIABILITIES
  ===================================== */

  const addLiability = async (
    liability
  ) => {

    await saveLiability(
      liability
    )

  }


  const updateLiability = async (
    id,
    data
  ) => {

    await updateLiabilityService(
      id,
      data
    )

  }


  const deleteLiability = async (
    id
  ) => {

    await deleteLiabilityService(
      id
    )

  }


  /* =====================================
      CREATE CONNECTED LOAN
  =====================================

      Loan creation performs 3 actions:

      1. Creates liability
      2. Increases linked asset
      3. Records LOAN_DISBURSEMENT
  ===================================== */

  const createLoan = async (loan) => {

    return await createLiabilityService(
      loan
    )

  }


  /* =====================================
      REPAY LOAN
  =====================================

      Repayment performs:

      1. Reduces loan liability
      2. Reduces linked asset
      3. Records LOAN_REPAYMENT

      Interest is separated from principal.
  ===================================== */

  const repayLoan = async (repayment) => {

    return await repayLiabilityService(
      repayment
    )

  }


  /* =====================================
      WEALTH VAULT
  ===================================== */

  const addWealthVault = (vault) => {

    const newVault = {

      id:
        Date.now(),

      title:
        vault.title,

      target:
        Number(
          vault.target || 0
        ),

      balance:
        0,

      monthlyContribution:
        Number(
          vault.monthlyContribution || 0
        ),

      priority:
        vault.priority,

      icon:
        vault.icon,

      createdAt:
        new Date()
          .toISOString()
          .split("T")[0],

    }


    setWealthVaults(
      (previous) => [

        ...previous,

        newVault,

      ]
    )

  }


  const depositToVault = ({
    vaultId,
    amount,
    source,
  }) => {

    const deposit =
      Number(amount)


    if (deposit <= 0) {
      return
    }


    setWealthVaults(
      (previous) =>

        previous.map(
          (vault) =>

            vault.id === vaultId

              ? {

                  ...vault,

                  balance:
                    Number(
                      vault.balance || 0
                    ) + deposit,

                }

              : vault

        )

    )


    setVaultTransactions(
      (previous) => [

        {

          id:
            Date.now(),

          vaultId,

          amount:
            deposit,

          source,

          date:
            new Date()
              .toISOString()
              .split("T")[0],

        },

        ...previous,

      ]

    )

  }


  /* =====================================
      CREDIT NOTES
  ===================================== */

  const issueCreditNote = ({
    type,
    id,
    reason,
  }) => {

    console.log(
      "Credit Note",
      {
        type,
        id,
        reason,
      }
    )

  }


  /* =====================================
      TOTAL INCOME
  ===================================== */

  const totalIncome =
    useMemo(

      () =>

        income.reduce(

          (sum, item) =>

            sum +
            Number(
              item.amount || 0
            ),

          0

        ),

      [income]

    )


  /* =====================================
      TOTAL EXPENSES
  ===================================== */

  const totalExpenses =
    useMemo(

      () =>

        expenses.reduce(

          (sum, item) =>

            sum +
            Number(
              item.amount || 0
            ),

          0

        ),

      [expenses]

    )


  /* =====================================
      TOTAL ASSETS
  ===================================== */

  const totalAssets =
    useMemo(

      () =>

        assets.reduce(

          (sum, asset) =>

            sum +
            Number(
              asset.value || 0
            ),

          0

        ),

      [assets]

    )


  /* =====================================
      TOTAL LIABILITIES
  ===================================== */

  const totalLiabilities =
    useMemo(

      () =>

        liabilities.reduce(

          (sum, liability) =>

            sum +
            Number(
              liability.currentBalance ??
              liability.outstandingBalance ??
              liability.principalAmount ??
              liability.originalAmount ??
              0
            ),

          0

        ),

      [liabilities]

    )


  /* =====================================
      NET WORTH
  ===================================== */

  const netWorth =
    totalAssets -
    totalLiabilities


  /* =====================================
      SAVINGS
  ===================================== */

  const totalSavings =
    useMemo(

      () =>

        savingsGoals.reduce(

          (sum, goal) =>

            sum +
            Number(
              goal.saved || 0
            ),

          0

        ),

      [savingsGoals]

    )


  /* =====================================
      WEALTH VAULT
  ===================================== */

  const totalVaultBalance =
    useMemo(

      () =>

        wealthVaults.reduce(

          (sum, vault) =>

            sum +
            Number(
              vault.balance || 0
            ),

          0

        ),

      [wealthVaults]

    )


  /* =====================================
      BUDGET
  ===================================== */

  const totalBudget =
    useMemo(

      () =>

        budgets.reduce(

          (sum, budget) =>

            sum +
            Number(
              budget.amount ??
              budget.budget ??
              0
            ),

          0

        ),

      [budgets]

    )


  /* =====================================
      TOTAL SPENT
  ===================================== */

  const totalSpentBudget =
    useMemo(

      () =>

        expenses.reduce(

          (sum, expense) =>

            sum +
            Number(
              expense.amount || 0
            ),

          0

        ),

      [expenses]

    )


  /* =====================================
      BALANCE
  ===================================== */

  const balance =
    totalIncome -
    totalExpenses


  /* =====================================
      SAVINGS RATE
  ===================================== */

  const savingsRate =

    totalIncome > 0

      ? Math.round(
          (
            totalSavings /
            totalIncome
          ) * 100
        )

      : 0


  /* =====================================
      WEALTH PROTECTION RATE
  ===================================== */

  const wealthProtectionRate =

    totalIncome > 0

      ? Math.round(
          (
            totalVaultBalance /
            totalIncome
          ) * 100
        )

      : 0


  /* =====================================
      BUDGET USAGE
  ===================================== */

  const budgetUsage =

    totalBudget > 0

      ? Math.round(
          (
            totalSpentBudget /
            totalBudget
          ) * 100
        )

      : 0


  /* =====================================
      BUDGET SUMMARY
  ===================================== */

  const budgetSummary =
    useMemo(() => {

      return budgets.map(
        (budget) => {

          const budgetCategory =
            budget.category ||
            budget.name


          const budgetAmount =
            Number(
              budget.amount ??
              budget.budget ??
              0
            )


          const spent =
            expenses

              .filter(
                (expense) =>

                  expense.category ===
                  budgetCategory

              )

              .reduce(

                (sum, expense) =>

                  sum +
                  Number(
                    expense.amount || 0
                  ),

                0

              )


          return {

            ...budget,

            spent,

            remaining:
              budgetAmount -
              spent,

            percentage:
              budgetAmount > 0

                ? Math.min(
                    100,
                    Math.round(
                      (
                        spent /
                        budgetAmount
                      ) * 100
                    )
                  )

                : 0,

          }

        }
      )

    }, [
      budgets,
      expenses,
    ])


  /* =====================================
      TRANSACTIONS
  ===================================== */

  const transactions =
    useMemo(() => {

      return [

        ...income.map(
          (item) => ({

            ...item,

            type:
              "income",

          })
        ),


        ...expenses.map(
          (item) => ({

            ...item,

            type:
              "expense",

          })
        ),

      ].sort(

        (a, b) =>

          new Date(
            b.date ||
            b.createdAt ||
            0
          ) -

          new Date(
            a.date ||
            a.createdAt ||
            0
          )

      )

    }, [
      income,
      expenses,
    ])


  /* =====================================
      CONTEXT VALUE
  ===================================== */

  const value = {

    loading,


    /* ==========================
       INCOME
    ========================== */

    income,

    addIncome,

    updateIncome,

    deleteIncome,


    /* ==========================
       EXPENSES
    ========================== */

    expenses,

    addExpense,

    updateExpense,

    deleteExpense,


    /* ==========================
       BUDGETS
    ========================== */

    budgets,

    budgetSummary,

    addBudget,

    updateBudget,

    deleteBudget,


    /* ==========================
       ASSETS
    ========================== */

    assets,

    totalAssets,

    addAsset,

    updateAsset,

    deleteAsset,


    /* ==========================
       LIABILITIES
    ========================== */

    liabilities,

    totalLiabilities,

    addLiability,

    updateLiability,

    deleteLiability,

    createLoan,

    repayLoan,


    /* ==========================
       WEALTH VAULT
    ========================== */

    wealthVaults,

    vaultTransactions,

    addWealthVault,

    depositToVault,


    /* ==========================
       SAVINGS
    ========================== */

    savingsGoals,

    totalSavings,


    /* ==========================
       INVESTMENTS
    ========================== */

    investments,


    /* ==========================
       TRANSACTIONS
    ========================== */

    transactions,


    /* ==========================
       FINANCIAL TOTALS
    ========================== */

    totalIncome,

    totalExpenses,

    balance,

    netWorth,

    totalVaultBalance,

    totalBudget,

    totalSpentBudget,

    savingsRate,

    wealthProtectionRate,

    budgetUsage,


    /* ==========================
       AUDIT
    ========================== */

    issueCreditNote,

  }


  return (

    <FinanceContext.Provider
      value={value}
    >

      {children}

    </FinanceContext.Provider>

  )

}


export function useFinance() {

  return useContext(
    FinanceContext
  )

}