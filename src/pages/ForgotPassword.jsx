import { useState } from "react"
import { Link } from "react-router-dom"

import { forgotPassword } from "../services/authService"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")

  const [message, setMessage] = useState("")

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError("")

    setMessage("")

    try {

      await forgotPassword(email)

      setMessage(

        "Password reset email has been sent. Please check your inbox."

      )

    } catch (err) {

      setError(err.message)

    }

    setLoading(false)

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-3xl font-bold">

          Reset Password

        </h1>

        <p className="mb-6 text-slate-500">

          Enter your email address to receive a password reset link.

        </p>

        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >

          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="w-full rounded-lg border px-4 py-3"

            required

          />

          {message && (

            <div className="rounded-lg bg-green-100 p-3 text-green-700">

              {message}

            </div>

          )}

          {error && (

            <div className="rounded-lg bg-red-100 p-3 text-red-700">

              {error}

            </div>

          )}

          <button

            disabled={loading}

            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"

          >

            {loading

              ? "Sending..."

              : "Send Reset Link"}

          </button>

        </form>

        <p className="mt-6 text-center">

          <Link

            to="/login"

            className="text-blue-600 hover:underline"

          >

            ← Back to Login

          </Link>

        </p>

      </div>

    </div>

  )

}