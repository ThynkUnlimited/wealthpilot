export default function ProgressBar({
  value,
  max
}) {

  const percentage = (value / max) * 100

  return (

    <div className="w-full">

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

    </div>

  )

}