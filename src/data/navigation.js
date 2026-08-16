import {
  LayoutDashboard,
  ArrowLeftRight,
  Activity,
  Receipt,
  Wallet,
  PiggyBank,
  Landmark,
  CreditCard,
  Vault,
  Target,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react"

const navigation = [

  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },

  {
    name: "Activity Centre",
    path: "/activity",
    icon: Activity,
  },

  {
    name: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },

  {
    name: "Income",
    path: "/income",
    icon: Wallet,
  },

  {
    name: "Budget",
    path: "/budget",
    icon: PiggyBank,
  },

  {
    name: "Assets",
    path: "/assets",
    icon: Landmark,
  },

  {
    name: "Liabilities",
    path: "/liabilities",
    icon: CreditCard,
  },

  {
    name: "Savings",
    path: "/savings",
    icon: PiggyBank,
  },

  {
    name: "Wealth Vault",
    path: "/wealth-vault",
    icon: Vault,
  },

  {
    name: "Financial Planner",
    path: "/planner",
    icon: Target,
  },

  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },

  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },

]

export default navigation