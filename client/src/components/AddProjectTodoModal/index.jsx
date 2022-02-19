import React from "react"
import {
    Box,
    Modal
} from "@mui/material"

import AddProjectTodoForm from "./AddProjectTodoForm"

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

export default function ProjectTodoAddModal({ project, isModalOpen, setIsModalOpen }) {
    const handleClose = () => setIsModalOpen(false)

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="project-todo-add-modal"
            aria-describedby="Project Todo Add Modal"
        >
            <Box sx={style}>
                <AddProjectTodoForm 
                    project={project}
                    setIsModalOpen={setIsModalOpen} 
                />
            </Box>
        </Modal>
    )
}

