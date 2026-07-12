import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  createUserWithEmailAndPassword,
} from "firebase/auth"

import { auth } from "../firebase/firebase"

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      await createUserWithEmailAndPassword(

        auth,

        email,

        password

      )

      navigate("/dashboard")

    } catch (err) {

      setError(err.message)

    }

    setLoading(false)

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">

          WealthPilot

        </h1>

        <p className="mb-8 text-slate-500">

          Create your account

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          />

          {error && (

            <p className="text-sm text-red-600">

              {error}

            </p>

          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >

            {loading ? "Creating Account..." : "Create Account"}

          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  )

}