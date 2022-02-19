import React from "react"
import {
    Menu
} from "@mui/material"

import DTPicker from "../DTPicker"

export default function DateTimeMenu({ anchorEl, setAnchorEl, deadline, setDeadline }) {
    const handleClose = (i, reason) => {
        if ( reason === "backdropClick" ) {
            setAnchorEl(null)
            return
        }
        
        setAnchorEl(null)
    }

    return (
        <Menu
            id="dateTime-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <DTPicker value={deadline} setValue={setDeadline} />
        </Menu>
    )
}
