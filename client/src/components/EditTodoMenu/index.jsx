import React from "react"
import {
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"

import { DELETE_TODO } from "../../graphql/mutations"
import { useMutation } from "@apollo/client"
import { useToast } from "../../contexts/ToastContext"
import { ALL_TODOS } from "../../graphql/queries"

export default function EditTodoMenu({ todo, anchor, setAnchor, setIsModalOpen }) {
    const { setToast } = useToast()

    const [ deleteTodo ] = useMutation( DELETE_TODO, {
        refetchQueries: [{ query: ALL_TODOS }],
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
    })

    const handleClose = (i, reason) => {
        if ( reason === "backdropClick" ) {
            setAnchor(null)
            return
        }
        
        setAnchor(null)
    }

    const handleDeleteTodo = async () => {
        if ( window.confirm( "Do you really want to delete this todo?" ) ) {
            deleteTodo({ 
                variables: { 
                    deleteTodoId: todo.id, 
                } 
            })

            setAnchor(null)
            setToast({ show: true, msg: "Successfully deleted new todo", severity: "success" })
        }
    }

    return (
        <Menu
            id="edit-todo-menu"
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={handleClose}
        >
            <MenuList dense>
                <MenuItem onClick={() => setIsModalOpen(true)} className="edit-menu-item edit">
                    <ListItemIcon>
                        <EditRoundedIcon fontSize="small" color="info" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteTodo} className="edit-menu-item delete">
                    <ListItemIcon>
                        <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
