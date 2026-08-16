import {
  createContext,
  useContext,
  useState,
} from "react"

const NotificationContext = createContext()

export function NotificationProvider({ children }) {

  const [notifications, setNotifications] = useState([])

  function addNotification(title, message, type = "info") {

    const notification = {

      id: Date.now(),

      title,

      message,

      type,

      read: false,

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    }

    setNotifications(prev => [

      notification,

      ...prev,

    ])

  }

  function markAsRead(id) {

    setNotifications(prev =>

      prev.map(item =>

        item.id === id

          ? { ...item, read: true }

          : item

      )

    )

  }

  function clearNotifications() {

    setNotifications([])

  }

  return (

    <NotificationContext.Provider

      value={{

        notifications,

        addNotification,

        markAsRead,

        clearNotifications,

      }}

    >

      {children}

    </NotificationContext.Provider>

  )

}

export function useNotifications() {

  return useContext(NotificationContext)

}