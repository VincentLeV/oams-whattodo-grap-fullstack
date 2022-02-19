import React from "react"
import {
    Box,
    Typography,
    Modal
} from "@mui/material"
import EditProjectForm from "./EditProjectForm"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
}

export default function EditProjectModal({ project, isEditModalOpen, setIsEditModalOpen }) {
    const handleClose = () => setIsEditModalOpen(false)

    return (
        <Modal
            open={isEditModalOpen}
            onClose={handleClose}
            aria-labelledby="edit-project-todo-modal"
            aria-describedby="Edit Project Todo Modal"
        >
            <Box sx={style}>
                <Typography id={"edit-project-todo-modal"} variant="h6" component="h2">
                    Edit Project
                </Typography>
                <EditProjectForm 
                    project={project} 
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            </Box>
        </Modal>
    )
}
