import AppLayout from "../components/layout/AppLayout"

export default function Settings() {
  return (
    <AppLayout>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          Settings
        </h1>

        <p className="text-sm text-slate-500">
          Configure your WealthPilot experience.
        </p>
      </div>
    </AppLayout>
  )
}