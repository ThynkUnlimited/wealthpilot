import Card from "../ui/Card"
import { useFinance } from "../../context/FinanceContext"

export default function ReportOverview() {

  const {

    transactions

  } = useFinance()

  return (

    <Card>

      <h2 className="text-xl font-semibold">

        Report Overview

      </h2>

      <div className="mt-5">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-2 text-left">

                Date

              </th>

              <th className="py-2 text-left">

                Description

              </th>

              <th className="py-2 text-left">

                Category

              </th>

              <th className="py-2 text-right">

                Amount

              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((item) => (

              <tr
                key={`${item.type}-${item.id}`}
                className="border-b"
              >

                <td className="py-3">

                  {item.date}

                </td>

                <td>

                  {item.title}

                </td>

                <td>

                  {item.category}

                </td>

                <td className="text-right font-semibold">

                  KSh {item.amount.toLocaleString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Card>

  )

}