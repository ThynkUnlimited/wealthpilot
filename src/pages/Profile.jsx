import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

export default function Profile() {
  return (
    <AppLayout>

      <PageHeader
        title="Profile"
        subtitle="Manage your account information."
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        <p className="text-slate-500">
          Profile settings will appear here.
        </p>

      </div>

    </AppLayout>
  )
}