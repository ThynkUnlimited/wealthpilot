export default function Logo() {
  return (
    <div className="flex items-center gap-2">

      <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center">

        <span className="text-white font-bold text-sm">
          W
        </span>

      </div>

      <div>

        <h2 className="text-sm font-semibold text-slate-900">
          WealthPilot
        </h2>

        <p className="text-[11px] text-slate-500">
          Personal Finance
        </p>

      </div>

    </div>
  )
}