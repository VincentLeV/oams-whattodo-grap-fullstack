import React from "react"
import { Accordion } from "@mui/material"

import ProjectHeader from "./ProjectHeader"
import ProjectContent from "./ProjectContent"
import ProjectToolbar from "./ProjectToolbar"

export default function ProjectContainer({ index, project }) {
    return (
        <Accordion>
            <ProjectHeader index={index} project={project} />

            {project.todos?.map((todo, i) => <ProjectContent key={i} project={project} todo={todo} />)}

            <ProjectToolbar project={project} />
        </Accordion>
    )
}
