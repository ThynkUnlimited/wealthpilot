import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import TransactionStats from "../components/transactions/TransactionStats"
import TransactionTable from "../components/transactions/TransactionTable"

export default function Transactions() {

  return (

    <AppLayout>

      <PageHeader
        title="Transactions"
        subtitle="View and manage all your financial activity."
      />

      <div className="space-y-6">

        <TransactionStats />

        <TransactionTable />

      </div>

    </AppLayout>

  )

}