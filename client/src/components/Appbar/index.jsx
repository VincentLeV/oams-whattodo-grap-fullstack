import React from "react"
import { 
    AppBar,
    Typography
} from "@mui/material"

import AppLogo from "../../assets/app.svg"
import MyLogo from "../../assets/logo-white.svg"

export default function Appbar() {
    return (
        <AppBar 
            position="absolute" 
            sx={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: { xs: "8px 12px", md: "8px 4vw" } 
            }}
        >
            <img src={AppLogo} alt="App Logo" width="50px" height="50px" />
            <Typography
                variant="h5"
                noWrap
                component="div"
                mx={1}
            >
                WhatToDo
            </Typography>

            <a href="https://www.vincentle.me/" target="_blank" rel="noreferrer">
                <img src={MyLogo} alt="My Logo" width="32px" height="32px" />   
                {/* <p>hidden</p> */}
            </a>
        </AppBar>
    )
}
