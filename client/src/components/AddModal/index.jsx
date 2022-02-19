import React from "react"
import {
    Box,
    Typography,
    Modal
} from "@mui/material"

import AddTodoForm from "./AddTodoForm"
import AddProjectForm from "./AddProjectForm"

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

export default function AddModal({ isModalOpen, setIsModalOpen, modalType }) {
    const handleClose = () => setIsModalOpen(false)

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="add-todo-modal"
            aria-describedby="Add Todo Modal"
        >
            <Box sx={style}>
                <Typography id={`${modalType}-modal`} variant="h6" component="h2">
                    {modalType === "todo" ? "Add Todo" : "Add Project"}
                </Typography>
                {
                    modalType === "todo" 
                        ? <AddTodoForm setIsModalOpen={setIsModalOpen} /> 
                        : <AddProjectForm setIsModalOpen={setIsModalOpen} />
                }
            </Box>
        </Modal>
    )
}