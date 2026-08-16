import { useState } from "react"

import SecurityCard from "./SecurityCard"
import VerifyPhone from "./VerifyPhone"

export default function EnableMFA() {

  const [loading, setLoading] = useState(false)

  const [enabled, setEnabled] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")

  async function handleVerify({ phone, code }) {

    setLoading(true)

    try {

      /*
       * Firebase MFA enrollment
       * will be added here next.
       */

      console.log("Phone:", phone)

      console.log("Verification Code:", code)

      setPhoneNumber(phone)

      setEnabled(true)

      alert("Phone verification completed.")

    } catch (error) {

      console.error(error)

      alert(error.message)

    }

    setLoading(false)

  }

  return (

    <SecurityCard

      title="Two-Factor Authentication"

      description="Protect your WealthPilot account with SMS verification."

    >

      <div className="mb-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">

        <div className="flex items-center justify-between">

          <span className="font-medium">

            Status

          </span>

          <span

            className={`font-semibold ${
              enabled
                ? "text-green-600"
                : "text-red-600"
            }`}

          >

            {enabled ? "Enabled" : "Disabled"}

          </span>

        </div>

        {phoneNumber && (

          <p className="mt-2 text-sm text-slate-500">

            Registered phone:

            <span className="ml-2 font-medium">

              {phoneNumber}

            </span>

          </p>

        )}

      </div>

      {!enabled && (

        <VerifyPhone

          loading={loading}

          onVerify={handleVerify}

        />

      )}

      {enabled && (

        <button

          onClick={() => {

            setEnabled(false)

            setPhoneNumber("")

          }}

          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"

        >

          Disable Two-Factor Authentication

        </button>

      )}

    </SecurityCard>

  )

}