import Card from "../ui/Card"

const bills = [
  {
    name: "Electricity",
    amount: 3500,
    due: "Tomorrow",
  },
  {
    name: "Internet",
    amount: 2800,
    due: "15 Jul",
  },
]

export default function UpcomingBills() {
  return (
    <Card>

      <h3 className="text-sm font-semibold mb-4">
        Upcoming Bills
      </h3>

      <div className="space-y-3">

        {bills.map((bill) => (

          <div
            key={bill.name}
            className="flex justify-between items-center"
          >

            <div>

              <p className="text-sm font-medium">
                {bill.name}
              </p>

              <p className="text-xs text-slate-500">
                Due {bill.due}
              </p>

            </div>

            <p className="font-semibold">
              KSh {bill.amount.toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </Card>
  )
}