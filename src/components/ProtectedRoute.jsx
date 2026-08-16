import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }) {

  const { user, loading } = useAuth()

  // Wait for Firebase to finish checking authentication
  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <p className="text-lg font-semibold">

          Loading...

        </p>

      </div>

    )

  }

  // Not logged in
  if (!user) {

    return <Navigate to="/login" replace />

  }

  // Email not verified
  if (!user.emailVerified) {

    return <Navigate to="/login" replace />

  }

  return children

}