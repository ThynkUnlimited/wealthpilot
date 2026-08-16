import { useEffect, useState } from "react"

import AppLayout from "../components/layout/AppLayout"

import { useAuth } from "../context/AuthContext"

import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService"

import {
  sendEmailVerification,
} from "firebase/auth"

export default function Settings() {

  const { user, logout } = useAuth()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    country: "",
    currency: "KES",
  })

  const [emailVerified, setEmailVerified] = useState(false)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {

    async function loadProfile() {

      if (!user) return

      try {

        await user.reload()

        setEmailVerified(user.emailVerified)

        const data = await getUserProfile(user.uid)

        if (data) {

          setProfile({

            fullName: data.fullName || "",

            phone: data.phone || "",

            country: data.country || "",

            currency: data.currency || "KES",

          })

        }

      } catch (err) {

        console.error(err)

      }

      setLoading(false)

    }

    loadProfile()

  }, [user])

  const saveProfile = async () => {

    setSaving(true)

    setMessage("")
    setError("")

    try {

      await updateUserProfile(

        user.uid,

        profile

      )

      setMessage("✅ Profile updated successfully.")

    } catch (err) {

      console.error(err)

      setError("Unable to update your profile.")

    }

    setSaving(false)

  }

  const resendVerification = async () => {

    setMessage("")
    setError("")

    try {

      await sendEmailVerification(user)

      setMessage(

        "📧 Verification email sent successfully. Please check your inbox."

      )

    } catch (err) {

      console.error(err)

      setError(

        "Unable to send verification email."

      )

    }

  }

  const refreshStatus = async () => {

    try {

      await user.reload()

      setEmailVerified(user.emailVerified)

    } catch (err) {

      console.error(err)

    }

  }

  return (

    <AppLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">

            Settings

          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">

            Manage your WealthPilot account.

          </p>

        </div>

        {/* Profile */}

        <div className="rounded-2xl bg-white p-8 shadow dark:bg-slate-900">

          <h2 className="mb-6 text-2xl font-semibold">

            Profile Information

          </h2>

          {loading ? (

            <p>Loading profile...</p>

          ) : (

            <div className="space-y-5">

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Full Name

                </label>

                <input
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                  value={profile.fullName}
                  onChange={(e)=>

                    setProfile({

                      ...profile,

                      fullName: e.target.value,

                    })

                  }
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Email

                </label>

                <input
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Phone

                </label>

                <input
                  value={profile.phone}
                  onChange={(e)=>

                    setProfile({

                      ...profile,

                      phone: e.target.value,

                    })

                  }
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Country

                </label>

                <input
                  value={profile.country}
                  onChange={(e)=>

                    setProfile({

                      ...profile,

                      country: e.target.value,

                    })

                  }
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Currency

                </label>

                <select
                  value={profile.currency}
                  onChange={(e)=>

                    setProfile({

                      ...profile,

                      currency: e.target.value,

                    })

                  }
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                >

                  <option>KES</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>TZS</option>
                  <option>UGX</option>

                </select>

              </div>

              {/* Account Security */}

              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

                <h3 className="mb-4 text-xl font-semibold">

                  Account Security

                </h3>

                <div className="flex items-center justify-between">

                  <span>Email Verification</span>

                  <span
                    className={`font-semibold ${
                      emailVerified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >

                    {emailVerified

                      ? "✅ Verified"

                      : "❌ Not Verified"}

                  </span>

                </div>

                {!emailVerified && (

                  <div className="mt-5 flex flex-wrap gap-3">

                    <button
                      onClick={resendVerification}
                      className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
                    >

                      Resend Verification Email

                    </button>

                    <button
                      onClick={refreshStatus}
                      className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                    >

                      Refresh Status

                    </button>

                  </div>

                )}

              </div>

              {message && (

                <div className="rounded-xl bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">

                  {message}

                </div>

              )}

              {error && (

                <div className="rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">

                  {error}

                </div>

              )}

              <div className="flex flex-wrap gap-4 pt-2">

                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                  {saving

                    ? "Saving..."

                    : "Save Changes"}

                </button>

                <button
                  onClick={logout}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </AppLayout>

  )

}