import React from "react"
import { Box, Divider } from "@mui/material"
import { useMutation } from "@apollo/client"
    
import { useToast } from "../../contexts/ToastContext"
import Todo from "../Todo"
import { UPDATE_TODO } from "../../graphql/todos/mutations"

export default function TodoContainer({ todo }) {
    const { setToast } = useToast()

    const [ updateTodo ] = useMutation( UPDATE_TODO, {
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
    })

    const handleChange = (e) => {
        updateTodo({ 
            variables: { 
                updateTodoId: todo.id, 
                input: {
                    priority: todo.priority,
                    isCompleted: e.target.checked
                } 
            } 
        })
    }

    return (
        <Box>
            <Todo from="quickTodo" todo={todo} handleChange={handleChange} />
            <Divider />
        </Box>
    )
}
