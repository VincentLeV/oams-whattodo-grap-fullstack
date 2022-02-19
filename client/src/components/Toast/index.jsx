import React from "react"
import {
    Snackbar,
    Alert,
    AlertTitle
} from "@mui/material"

import { useToast } from "../../contexts/ToastContext"

export default function Toast() {
    const { toast, setToast } = useToast()

    const handleClose = (e, reason) => {
        if (reason === "clickaway") return

        setToast({ ...toast, show: false })
    }

    const getAlertTitle = (severity) => {
        switch ( severity ) {
        case "error":
            return "Error"
        case "success":
            return "Success"
        default:
            return "Info"
        }
    }   

    return (
        <Snackbar 
            open={toast.show} 
            autoHideDuration={4000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={toast.severity} sx={{ width: { xs: "80%", lg: "100%" }, my: 2 }}>
                <AlertTitle>{getAlertTitle(toast.severity)}</AlertTitle>
                {toast.msg}
            </Alert>
        </Snackbar>
    )
}
