import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth"

import { auth } from "../firebase/firebase"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [showResend, setShowResend] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")
    setInfo("")
    setShowResend(false)
    setLoading(true)

    try {

      console.log("Attempting login...")
      console.log("Email:", email)
      console.log("Password Length:", password.length)

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        )

      console.log("LOGIN SUCCESS")
      console.log(userCredential.user)

      await userCredential.user.reload()

      if (!userCredential.user.emailVerified) {

        await signOut(auth)

        setError(
          "Your email address has not been verified."
        )

        setShowResend(true)
        setLoading(false)

        return

      }

      navigate("/dashboard")

    }

    catch (err) {

      console.error("Firebase Login Error:", err)
      console.error("Error Code:", err.code)
      console.error("Error Message:", err.message)

      switch (err.code) {

        case "auth/user-not-found":

          setError("Account not found.")
          break

        case "auth/wrong-password":

          setError("Incorrect password.")
          break

        case "auth/invalid-email":

          setError("Invalid email address.")
          break

        case "auth/invalid-credential":

          setError(
            "Invalid email or password."
          )
          break

        case "auth/too-many-requests":

          setError(
            "Too many failed attempts. Please try again later."
          )
          break

        default:

          setError(err.message)

      }

    }

    setLoading(false)

  }

  const resendVerification = async () => {

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        )

      await sendEmailVerification(
        userCredential.user
      )

      await signOut(auth)

      setInfo(
        "A new verification email has been sent."
      )

      setShowResend(false)

    }

    catch (err) {

      console.error(err)

      setError(
        "Unable to resend verification email."
      )

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <h1 className="mb-2 text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Login to your WealthPilot account.
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
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            required
          />

          {error && (

            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950">

              {error}

            </div>

          )}

          {info && (

            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950">

              {info}

            </div>

          )}

          {showResend && (

            <button
              type="button"
              onClick={resendVerification}
              className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600"
            >

              Resend Verification Email

            </button>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

        <div className="mt-5 text-center">

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >

            Forgot Password?

          </Link>

        </div>

        <p className="mt-6 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-blue-600 hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  )

}