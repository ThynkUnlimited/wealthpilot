import Card from "../../../components/ui/Card"

import { useFinance } from "../../../context/FinanceContext"

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ShieldCheck,
} from "lucide-react"

export default function DashboardMetrics() {

  const {

    totalIncome,

    totalExpenses,

    balance,

    totalVaultBalance,

  } = useFinance()

  const cards = [

    {

      title: "Current Balance",

      value: balance,

      icon: Wallet,

      color: "text-emerald-600",

      bg: "bg-emerald-100 dark:bg-emerald-900/30",

      trend: balance >= 0 ? "+ Healthy" : "- Deficit",

    },

    {

      title: "Total Income",

      value: totalIncome,

      icon: ArrowDownCircle,

      color: "text-blue-600",

      bg: "bg-blue-100 dark:bg-blue-900/30",

      trend: "+ Income",

    },

    {

      title: "Total Expenses",

      value: totalExpenses,

      icon: ArrowUpCircle,

      color: "text-red-600",

      bg: "bg-red-100 dark:bg-red-900/30",

      trend: "Expenses",

    },

    {

      title: "Protected Wealth",

      value: totalVaultBalance,

      icon: ShieldCheck,

      color: "text-purple-600",

      bg: "bg-purple-100 dark:bg-purple-900/30",

      trend: "Vault",

    },

  ]

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon

        return (

          <Card key={card.title}>

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-slate-500 dark:text-slate-400">

                  {card.title}

                </p>

                <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>

                  KES {Number(card.value).toLocaleString()}

                </h2>

                <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">

                  {card.trend}

                </span>

              </div>

              <div

                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}

              >

                <Icon

                  size={28}

                  className={card.color}

                />

              </div>

            </div>

          </Card>

        )

      })}

    </div>

  )

}