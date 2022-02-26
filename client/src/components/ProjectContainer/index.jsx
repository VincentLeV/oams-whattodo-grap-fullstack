import React, { useState, useEffect } from "react"
import { Accordion } from "@mui/material"

import { sortTodos } from "../../utils/helpers"
import ProjectHeader from "./ProjectHeader"
import ProjectContent from "./ProjectContent"
import ProjectToolbar from "./ProjectToolbar"

export default function ProjectContainer({ index, project }) {
    const [ newProject, setNewProject ] = useState({})

    useEffect(() => {  
        if (!project.todos) return
        const { todos, ...restOfProject } = project
        const newTodos = sortTodos([...todos], "completed")
        setNewProject({ ...restOfProject, todos: newTodos })
    }, [project])

    return (
        <Accordion>
            <ProjectHeader index={index} project={project} />
            {newProject?.todos?.map((todo, i) => <ProjectContent key={i} project={project} todo={todo} />)}

            <ProjectToolbar project={project} />
        </Accordion>
    )
}
