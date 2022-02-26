import React, { useState, useEffect } from "react"
import {
    Box,
    List,
    Typography
} from "@mui/material"
import { useQuery } from "@apollo/client"

import { sortTodos } from "../utils/helpers"
import { ALL_TODOS } from "../graphql/todos/queries"
import TodoContainer from "../components/TodoContainer"

export default function QuickTodos() {
    const [ todos, setTodos ] = useState([])
    const todoResult = useQuery(ALL_TODOS)

    useEffect(() => {
        (async () => {
            const allTodos = await todoResult?.data?.todos
            // console.log("🚀 ~ file: Main.jsx ~ line 23 ~ useEffect ~ allTodos", allTodos)

            if (allTodos) {
                const sorted = sortTodos(allTodos, "completed")
                setTodos(sorted)
            } 
        })()
    }, [todoResult?.data])

    if ( todoResult.loading ) return <div>Loading...</div>

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
                {todos.map(t => <TodoContainer key={t.id} todo={t} />)}
            </List>
        </Box>
    )
}
