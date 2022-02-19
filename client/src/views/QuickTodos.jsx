import React from "react"
import {
    Box,
    List,
    Typography
} from "@mui/material"

import { useTodos } from "../contexts/TodosContext"
import TodoContainer from "../components/TodoContainer"

export default function QuickTodos() {
    const { todos } = useTodos()

    if ( todos.length === 0 ) {
        return (
            <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
                No Todo
            </Typography>
        )
    }

    return (
        <Box id="todos-container">
            <List>
                {todos.map((t, i) => <TodoContainer key={i} todo={t} />)}
            </List>
        </Box>
    )
}
