export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-6">

      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  )
}