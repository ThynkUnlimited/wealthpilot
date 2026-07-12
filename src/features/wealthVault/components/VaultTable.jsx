import { useState } from "react"

import { useFinance } from "../../../context/FinanceContext"

import DepositModal from "./DepositModal"

export default function VaultTable({ vaults }) {

  const [selectedVault, setSelectedVault] = useState(null)

  const progress = (balance, target) => {

    if (target <= 0) return 0

    return Math.min(Math.round((balance / target) * 100), 100)

  }

  return (

    <>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr className="text-left text-sm font-semibold text-slate-600">

                <th className="px-5 py-4">
                  Vault
                </th>

                <th className="px-5 py-4">
                  Target
                </th>

                <th className="px-5 py-4">
                  Balance
                </th>

                <th className="px-5 py-4">
                  Monthly
                </th>

                <th className="px-5 py-4">
                  Progress
                </th>

                <th className="px-5 py-4">
                  Priority
                </th>

                <th className="px-5 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {vaults.map((vault) => (

                <tr
                  key={vault.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">

                        {vault.icon}

                      </span>

                      <div>

                        <p className="font-semibold">

                          {vault.title}

                        </p>

                        <p className="text-xs text-slate-500">

                          Created {vault.createdAt}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    KSh {vault.target.toLocaleString()}

                  </td>

                  <td className="px-5 py-4 font-semibold text-green-600">

                    KSh {vault.balance.toLocaleString()}

                  </td>

                  <td className="px-5 py-4">

                    KSh {vault.monthlyContribution.toLocaleString()}

                  </td>

                  <td className="px-5 py-4 w-72">

                    <div className="h-3 rounded-full bg-slate-200">

                      <div

                        className="h-3 rounded-full bg-blue-600"

                        style={{

                          width: `${progress(vault.balance, vault.target)}%`

                        }}

                      />

                    </div>

                    <p className="mt-1 text-xs text-slate-500">

                      {progress(vault.balance, vault.target)}%

                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        vault.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : vault.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {vault.priority}

                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() => setSelectedVault(vault)}

                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"

                      >

                        Deposit

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <DepositModal

        vault={selectedVault}

        open={selectedVault !== null}

        onClose={() => setSelectedVault(null)}

      />

    </>

  )

}