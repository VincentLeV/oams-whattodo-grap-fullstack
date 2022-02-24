import React from "react"
import { Modal, Box } from "@mui/material"

import EditTodoForm from "./EditTodoForm"
import EditProjectTodoForm from "./EditProjectTodoForm"

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

export default function EditTodoModal({ from, todo, project, isModalOpen, setIsModalOpen, setAnchor }) {
    const handleClose = () => setIsModalOpen(false)

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="add-todo-modal"
            aria-describedby="Add Todo Modal"
        >
            <Box sx={style}>
                {
                    from === "quickTodo"
                        ? <EditTodoForm todo={todo} setIsModalOpen={setIsModalOpen} setAnchor={setAnchor} />
                        : <EditProjectTodoForm todo={todo} project={project} setIsModalOpen={setIsModalOpen} setAnchor={setAnchor} />
                }
            </Box>
        </Modal>
    )
}
