import Card from "../../../components/ui/Card"

import { useFinance } from "../../../context/FinanceContext"

export default function VaultSummary() {

  const {

    wealthVaults,

    totalVaultBalance,

    wealthProtectionRate,

  } = useFinance()

  const totalTarget = wealthVaults.reduce(

    (sum, vault) => sum + vault.target,

    0

  )

  const completion =

    totalTarget > 0

      ? Math.round((totalVaultBalance / totalTarget) * 100)

      : 0

  return (

    <div className="grid gap-6 md:grid-cols-4">

      <Card>

        <h3 className="text-sm font-medium text-slate-500">

          Total Wealth Protected

        </h3>

        <p className="mt-2 text-3xl font-bold">

          KSh {totalVaultBalance.toLocaleString()}

        </p>

      </Card>

      <Card>

        <h3 className="text-sm font-medium text-slate-500">

          Wealth Vaults

        </h3>

        <p className="mt-2 text-3xl font-bold">

          {wealthVaults.length}

        </p>

      </Card>

      <Card>

        <h3 className="text-sm font-medium text-slate-500">

          Protection Rate

        </h3>

        <p className="mt-2 text-3xl font-bold text-green-600">

          {wealthProtectionRate}%

        </p>

      </Card>

      <Card>

        <h3 className="text-sm font-medium text-slate-500">

          Overall Progress

        </h3>

        <p className="mt-2 text-3xl font-bold text-blue-600">

          {completion}%

        </p>

      </Card>

    </div>

  )

}