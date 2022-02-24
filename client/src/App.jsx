import React, { useState } from "react"
import "./styles/app.css"
import { Container } from "@mui/material"
import { LocalizationProvider } from "@mui/lab"
import DateAdapter from "@mui/lab/AdapterMoment"

import ToastProvider from "./contexts/ToastContext"
import TabMenu from "./components/TabMenu"
import AddDial from "./components/AddDial"
import AddModal from "./components/AddModal"
import Toast from "./components/Toast"
import Appbar from "./components/Appbar"

function App() {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ modalType, setModalType ] = useState("")

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ToastProvider>
                <Appbar />

                <Container 
                    maxWidth="sm" 
                    sx={{ 
                        position: "relative", 
                        height: { xs: "85vh", md: "100vh" }, 
                        padding: { xs: "9vh 5px 20px 5px", lg: "12vh 5px 20px 5px" } 
                    }}
                >
                    <TabMenu />

                    <AddDial 
                        isModalOpen={isModalOpen} 
                        setIsModalOpen={setIsModalOpen} 
                        setModalType={setModalType} 
                    />

                    <AddModal 
                        isModalOpen={isModalOpen} 
                        setIsModalOpen={setIsModalOpen} 
                        modalType={modalType} 
                    />

                    <Toast />
                </Container>
            </ToastProvider>
        </LocalizationProvider>
    )
}

export default App
