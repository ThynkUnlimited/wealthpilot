import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth"

import { auth } from "../firebase/firebase"
import { createUserProfile } from "../services/userService"

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [currency, setCurrency] = useState("KES")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [agree, setAgree] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [registered, setRegistered] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    if (password !== confirmPassword) {

      setError("Passwords do not match.")

      return

    }

    if (!agree) {

      setError("Please accept the Terms and Privacy Policy.")

      return

    }

    setLoading(true)

    try {

      const userCredential =
        await createUserWithEmailAndPassword(

          auth,

          email,

          password

        )

      await updateProfile(

        userCredential.user,

        {

          displayName: name,

        }

      )

      await createUserProfile(

        userCredential.user,

        {

          fullName: name,

          phone,

          country,

          currency,

        }

      )

      await sendEmailVerification(

        userCredential.user

      )

      await signOut(auth)

      setRegisteredEmail(email)

      setRegistered(true)

    }

    catch (err) {

      switch (err.code) {

        case "auth/email-already-in-use":

          setError("This email is already registered.")

          break

        case "auth/weak-password":

          setError("Password must be at least 6 characters.")

          break

        case "auth/invalid-email":

          setError("Please enter a valid email address.")

          break

        default:

          setError(err.message)

      }

    }

    setLoading(false)

  }

  if (registered) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl dark:bg-slate-900">

          <div className="mb-6 text-6xl">

            📧

          </div>

          <h1 className="mb-3 text-3xl font-bold">

            Verify Your Email

          </h1>

          <p className="mb-6 text-slate-500 dark:text-slate-400">

            Your WealthPilot account has been created successfully.

          </p>

          <div className="rounded-xl bg-blue-50 p-5 dark:bg-slate-800">

            <p className="text-sm">

              We've sent a verification email to:

            </p>

            <p className="mt-2 font-semibold text-blue-700 dark:text-blue-400">

              {registeredEmail}

            </p>
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">

            Please open your inbox and click the verification link before logging in.

          </p>

          <button

            onClick={() => navigate("/login")}

            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            Continue to Login

          </button>

        </div>

      </div>

    )

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <h1 className="mb-2 text-4xl font-bold">

          Create WealthPilot Account

        </h1>

        <p className="mb-6 text-slate-500 dark:text-slate-400">

          Start managing your finances securely.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <select
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="TZS">TZS</option>
            <option value="UGX">UGX</option>
          </select>

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            required
          />

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e)=>setAgree(e.target.checked)}
            />

            I agree to the Terms and Privacy Policy.

          </label>

          {error && (

            <p className="text-sm text-red-600">

              {error}

            </p>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >

            {loading

              ? "Creating Account..."

              : "Create Account"}

          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-medium text-blue-600 hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  )

}