import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

export default function Investments() {
  return (
    <AppLayout>

      <PageHeader
        title="Investments"
        subtitle="Track your investment portfolio."
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        <p className="text-slate-500">
          Investment tracking will appear here.
        </p>

      </div>

    </AppLayout>
  )
}