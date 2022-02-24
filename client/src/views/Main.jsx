import React, { useEffect } from "react"
import { TabPanel } from "@mui/lab"
import { useQuery } from "@apollo/client"

import { useTodos } from "../contexts/TodosContext"
import { useProjects } from "../contexts/ProjectContext"
import { useToast } from "../contexts/ToastContext"
import { sortTodos } from "../utils/helpers"
import Projects from "./Projects"
import QuickTodos from "./QuickTodos"
import { ALL_TODOS } from "../graphql/queries"

export default function Main() {
    const { setTodos } = useTodos()
    const todoResult = useQuery(ALL_TODOS)

    useEffect(() => {
        (async () => {
            const allTodos = await todoResult?.data?.todos
            console.log("🚀 ~ file: Main.jsx ~ line 23 ~ useEffect ~ allTodos", allTodos)

            if (allTodos) {
                const sorted = sortTodos(allTodos, "completed")
                setTodos(sorted)
            }
        })()
    }, [todoResult?.data])

    if ( todoResult.loading ) return <div>Loading...</div>

    return (
        <main>
            <TabPanel value="1">
                <QuickTodos />
            </TabPanel>
            <TabPanel value="2">
                <Projects />
            </TabPanel>
        </main>
    )
}
