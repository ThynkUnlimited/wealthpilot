import Card from "./Card"

export default function StatCard({
    title,
    value,
    color = "text-slate-900"
}) {

    return (

        <Card>

            <p className="text-xs text-slate-500">
                {title}
            </p>

            <h2 className={`text-xl font-bold mt-2 ${color}`}>
                {value}
            </h2>

        </Card>

    )

}