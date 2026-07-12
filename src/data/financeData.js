export const initialFinanceData = {

  /* ==========================
      INCOME
  ========================== */

  income: [

    {
      id: 1,
      title: "Monthly Salary",
      category: "Salary",
      amount: 120000,
      paymentMethod: "Bank Transfer",
      reference: "SAL-JUL-2026",
      status: "active",
      date: "2026-07-25",
    },

  ],

  /* ==========================
      EXPENSES
  ========================== */

  expenses: [

    {
      id: 1,
      title: "Rent",
      category: "Housing",
      amount: 35000,
      paymentMethod: "Bank Transfer",
      reference: "EXP-001",
      status: "active",
      date: "2026-07-01",
    },

    {
      id: 2,
      title: "Fuel",
      category: "Transport",
      amount: 4500,
      paymentMethod: "M-Pesa",
      reference: "EXP-002",
      status: "active",
      date: "2026-07-02",
    },

    {
      id: 3,
      title: "Groceries",
      category: "Food",
      amount: 8600,
      paymentMethod: "Cash",
      reference: "EXP-003",
      status: "active",
      date: "2026-07-03",
    },

  ],

  /* ==========================
      WEALTH VAULTS
  ========================== */

  wealthVaults: [

    {
      id: 1,
      title: "Emergency Fund",
      target: 300000,
      balance: 120000,
      monthlyContribution: 20000,
      priority: "High",
      icon: "🛡️",
      createdAt: "2026-07-01",
    },

    {
      id: 2,
      title: "Business Capital",
      target: 500000,
      balance: 170000,
      monthlyContribution: 15000,
      priority: "High",
      icon: "🏢",
      createdAt: "2026-07-01",
    },

    {
      id: 3,
      title: "Investment Fund",
      target: 250000,
      balance: 90000,
      monthlyContribution: 10000,
      priority: "Medium",
      icon: "📈",
      createdAt: "2026-07-01",
    },

    {
      id: 4,
      title: "House Deposit",
      target: 2000000,
      balance: 460000,
      monthlyContribution: 25000,
      priority: "Medium",
      icon: "🏠",
      createdAt: "2026-07-01",
    },

  ],

  /* ==========================
      BUDGETS
  ========================== */

  budgets: [

    {
      id: 1,
      name: "Food",
      budget: 12000,
      spent: 5400,
      icon: "🍔",
    },

    {
      id: 2,
      name: "Transport",
      budget: 8000,
      spent: 2300,
      icon: "🚌",
    },

    {
      id: 3,
      name: "Housing",
      budget: 35000,
      spent: 35000,
      icon: "🏠",
    },

  ],

  /* ==========================
      LEGACY SAVINGS
      (Temporary - remove after
      Wealth Vault is complete)
  ========================== */

  savingsGoals: [

    {
      id: 1,
      title: "Emergency Fund",
      target: 100000,
      saved: 75000,
      icon: "🛡️",
    },

    {
      id: 2,
      title: "Vacation",
      target: 60000,
      saved: 18000,
      icon: "✈️",
    },

  ],

  /* ==========================
      INVESTMENTS
  ========================== */

  investments: [],

}