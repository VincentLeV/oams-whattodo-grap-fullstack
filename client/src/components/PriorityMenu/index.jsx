import React from "react"
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"

import priorityList from "../../constants/priority"

export default function PriorityMenu({ anchorEl, setAnchorEl, setPriority, handleUpdatePriority }) {
    const handleClose = (i, reason) => {
        if ( reason === "backdropClick" ) {
            setAnchorEl(null)
            return
        }
        
        setAnchorEl(null)
        if ( setPriority ) {
            switch (i) {
            case 0:
                setPriority(priorityList[0])
                break
            case 1:
                setPriority(priorityList[1])
                break
            case 2:
                setPriority(priorityList[2])
                break
            default:
                setPriority("")
            }
        } else if ( handleUpdatePriority ) {
            switch (i) {
            case 0:
                handleUpdatePriority(3)
                break
            case 1:
                handleUpdatePriority(2)
                break
            case 2:
                handleUpdatePriority(1)
                break
            default:
                handleUpdatePriority(0)
            }
        }
    }

    return (
        <Menu
            id="priority-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {
                priorityList.map((p, i) => (
                    <MenuItem key={i} onClick={() => handleClose(i)} className="priority-menu-item">
                        <ListItemIcon>
                            <FlagRoundedIcon fontSize="medium" color={p.color} />
                        </ListItemIcon>
                        <ListItemText>{p.label}</ListItemText>
                    </MenuItem>
                ))
            }
        </Menu>
    )
}
