import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import "./index.css"

import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { FinanceProvider } from "./context/FinanceContext"
import { NotificationProvider } from "./context/NotificationContext"

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <FinanceProvider>

          <NotificationProvider>

            <App />

          </NotificationProvider>

        </FinanceProvider>

      </AuthProvider>

    </ThemeProvider>

  </React.StrictMode>

)