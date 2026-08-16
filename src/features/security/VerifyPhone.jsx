import { useState } from "react"

export default function VerifyPhone({

  onVerify,

  loading,

}) {

  const [phone, setPhone] = useState("")

  const [code, setCode] = useState("")

  return (

    <div className="space-y-5">

      <div>

        <label className="mb-2 block text-sm font-medium">

          Phone Number

        </label>

        <input

          value={phone}

          onChange={(e)=>setPhone(e.target.value)}

          placeholder="+254712345678"

          className="w-full rounded-xl border p-3"

        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">

          Verification Code

        </label>

        <input

          value={code}

          onChange={(e)=>setCode(e.target.value)}

          placeholder="123456"

          className="w-full rounded-xl border p-3"

        />

      </div>

      <button

        onClick={() =>

          onVerify({

            phone,

            code,

          })

        }

        disabled={loading}

        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

      >

        {loading

          ? "Verifying..."

          : "Verify Phone"}

      </button>

    </div>

  )

}