import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

import { auth } from "../firebase/firebase"

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    console.log("🚀 AuthContext started")

    const unsubscribe = onAuthStateChanged(

      auth,

      (currentUser) => {

        console.log("==============================")
        console.log("🔥 AUTH STATE CHANGED")
        console.log(currentUser)

        if (currentUser) {

          console.log("✅ User is logged in")

        } else {

          console.log("❌ No user logged in")

        }

        setUser(currentUser)
        setLoading(false)

        console.log("✅ Loading finished")

      }

    )

    return () => unsubscribe()

  }, [])

  const logout = async () => {

    await signOut(auth)

  }

  if (loading) {

    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    )

  }

  return (

    <AuthContext.Provider

      value={{
        user,
        loading,
        logout,
      }}

    >

      {children}

    </AuthContext.Provider>

  )

}

export function useAuth() {

  return useContext(AuthContext)

}