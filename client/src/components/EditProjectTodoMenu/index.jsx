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

// import Axios from "../../services/axios"
import { useToast } from "../../contexts/ToastContext"
import { useProjects } from "../../contexts/ProjectContext" 

export default function EditProjectTodoMenu({ todo, project, anchor, setAnchor, setIsModalOpen }) {
    const { setToast } = useToast()
    const { projects } = useProjects()

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
                // await Axios.deleteProjectTodo(project.id, todo.id)
                const storedProj = projects.find(p => p.id === project.id)
                storedProj.todos = project.todos.filter(t => t.id !== todo.id)
                console.log("deleted")
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
