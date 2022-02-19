import React, { useEffect } from "react"
import { Box } from "@mui/material"

// import Axios from "../../services/axios"
import { useProjects } from "../../contexts/ProjectContext"
import { sortTodos } from "../../utils/helpers"
import Todo from "../Todo"

export default function ProjectTodoContainer({ todo, project }) {
    const { projects, setProjects } = useProjects()

    useEffect(() => {
        projects.map(p => p.todos.map(t => {
            t.id = t._id
            return t.id
        }))
    }, [projects])

    const handleChange = async (e) => {
        let found = project.todos.find(x => x.id === e.target.name)

        found.isCompleted = e.target.checked

        if ( e.target.checked ) {
            const newTodos = project.todos.filter(x => x.id !== e.target.name)
            project.todos = [ ...newTodos, found ]
            setProjects([ ...projects ])
        } else if ( !e.target.checked ) {
            const todoIndex = project.todos.findIndex(x => x.id === e.target.name)
            project.todos.splice(todoIndex, 1, found)
            sortTodos([ ...project.todos ], "priority")
            setProjects([ ...projects ])
        }

        handleUpdateCompletion(project)
    }

    const handleUpdateCompletion = async (proj) => {
        try {
            proj.todos.map(t => delete t.id )
            // await Axios.updateProject(proj.id, proj)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box className="project-todo-container">
            <Todo from="project" project={project} todo={todo} handleChange={handleChange} />
        </Box>
    )
}
