import React from "react"
import { Box } from "@mui/material"
import { useMutation } from "@apollo/client"

import { UPDATE_PROJECT_TODO } from "../../graphql/projectTodos/mutations"
import { useToast } from "../../contexts/ToastContext"
import Todo from "../Todo"

export default function ProjectTodoContainer({ todo, project }) {
    const { setToast } = useToast()

    const [ updateProjectTodo ] = useMutation( UPDATE_PROJECT_TODO, {
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
    })

    const handleChange = (e) => {
        updateProjectTodo({ 
            variables: { 
                updateProjectTodoId: todo.id, 
                input: {
                    priority: todo.priority,
                    isCompleted: e.target.checked
                } 
            } 
        })
    }

    return (
        <Box className="project-todo-container">
            <Todo from="project" project={project} todo={todo} handleChange={handleChange} />
        </Box>
    )
}
