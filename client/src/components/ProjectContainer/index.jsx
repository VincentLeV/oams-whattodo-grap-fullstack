import React, { useState, useEffect } from "react"
import { Accordion } from "@mui/material"

import { sortTodos } from "../../utils/helpers"
import ProjectHeader from "./ProjectHeader"
import ProjectContent from "./ProjectContent"
import ProjectToolbar from "./ProjectToolbar"

export default function ProjectContainer({ index, project }) {
    const [ newProject, setNewProject ] = useState({})

    useEffect(() => {  
        const newTodos = sortTodos([...project.todos], "completed")
        const { todos, ...restOfProject } = project
        setNewProject({ ...restOfProject, todos: newTodos })
    }, [project])

    return (
        <Accordion>
            <ProjectHeader index={index} project={project} />
            {newProject.todos?.map((todo, i) => <ProjectContent key={i} project={project} todo={todo} />)}

            <ProjectToolbar project={project} />
        </Accordion>
    )
}
