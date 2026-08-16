export default function SecurityCard({

  title,

  description,

  children,

}) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      <h3 className="text-xl font-semibold">

        {title}

      </h3>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

        {description}

      </p>

      <div className="mt-6">

        {children}

      </div>

    </div>

  )

}