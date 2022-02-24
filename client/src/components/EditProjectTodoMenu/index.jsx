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
import { useMutation } from "@apollo/client"

import { DELETE_PROJECT_TODO } from "../../graphql/projectTodos/mutations"
import { ALL_PROJECTS } from "../../graphql/projects/queries"
import { useToast } from "../../contexts/ToastContext"

export default function EditProjectTodoMenu({ todo, anchor, setAnchor, setIsModalOpen }) {
    const { setToast } = useToast()

    const [ deleteProjectTodo ] = useMutation( DELETE_PROJECT_TODO, {
        refetchQueries: [{ query: ALL_PROJECTS }],
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        })
    })

    const handleClose = (i, reason) => {
        if ( reason === "backdropClick" ) {
            setAnchor(null)
            return
        }
        
        setAnchor(null)
    }

    const handleDeleteProjectTodo = async () => {
        try {
            if ( window.confirm( "Do you really want to delete this todo?" ) ) {
                deleteProjectTodo({
                    variables: { deleteProjectTodoId: todo.id }
                })

                setAnchor(null)
                setToast({ show: true, msg: "Successfully deleted new todo", severity: "success" })
            }
        } catch (err) {
            setToast({ show: true, msg: err.response?.data?.message, severity: "error" })
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
                <MenuItem onClick={() => setIsModalOpen(true)}>
                    <ListItemIcon>
                        <EditRoundedIcon fontSize="small" color="info" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteProjectTodo}>
                    <ListItemIcon>
                        <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
