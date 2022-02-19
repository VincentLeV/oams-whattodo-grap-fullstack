import React, { useState, createContext, useContext } from "react"

const ToastContext = createContext()

export const useToast = () => useContext( ToastContext )

export default function ToastProvider({ children }) {
    const [ toast, setToast ] = useState({ show: false, msg: "", severity: "info" })

    return (
        <ToastContext.Provider value={{ toast, setToast }} >
            {children}
        </ToastContext.Provider>
    )
}
