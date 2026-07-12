import { useState } from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import { useFinance } from "../context/FinanceContext"

import VaultSummary from "../features/wealthVault/components/VaultSummary"
import VaultTable from "../features/wealthVault/components/VaultTable"
import AddVaultModal from "../features/wealthVault/components/AddVaultModal"

export default function WealthVault() {

  const { wealthVaults } = useFinance()

  const [openModal, setOpenModal] = useState(false)

  return (

    <AppLayout>

      <PageHeader
        title="Wealth Vault"
        subtitle="Protect today's income to build tomorrow's wealth."
      />

      <div className="space-y-6">

        <div className="flex justify-end">

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            + Create Vault
          </button>

        </div>

        <VaultSummary />

        {wealthVaults.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <h2 className="text-xl font-semibold text-slate-700">

              No Wealth Vaults Yet

            </h2>

            <p className="mt-2 text-slate-500">

              Create your first Wealth Vault and start protecting your future wealth.

            </p>

          </div>

        ) : (

          <VaultTable vaults={wealthVaults} />

        )}

      </div>

      <AddVaultModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </AppLayout>

  )

}