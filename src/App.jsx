import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import ActivityCentre from "./pages/ActivityCentre"
import Expenses from "./pages/Expenses"
import Income from "./pages/Income"
import Budget from "./pages/Budget"
import Assets from "./pages/Assets"
import Liabilities from "./pages/Liabilities"
import Savings from "./pages/Savings"
import WealthVault from "./pages/WealthVault"
import Planner from "./pages/Planner"
import Analytics from "./pages/Analytics"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"

import ProtectedRoute from "./components/ProtectedRoute"


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ==========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* ==========================
            PROTECTED ROUTES
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />


        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <ActivityCentre />
            </ProtectedRoute>
          }
        />


        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />


        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />


        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />


        {/* ==========================
            ASSETS
        ========================== */}

        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />


        {/* ==========================
            LIABILITIES
        ========================== */}

        <Route
          path="/liabilities"
          element={
            <ProtectedRoute>
              <Liabilities />
            </ProtectedRoute>
          }
        />


        <Route
          path="/savings"
          element={
            <ProtectedRoute>
              <Savings />
            </ProtectedRoute>
          }
        />


        <Route
          path="/wealth-vault"
          element={
            <ProtectedRoute>
              <WealthVault />
            </ProtectedRoute>
          }
        />


        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner />
            </ProtectedRoute>
          }
        />


        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />


        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />


        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />


        {/* ==========================
            UNKNOWN ROUTES
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  )

}