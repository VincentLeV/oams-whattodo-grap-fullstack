import React from "react"
import {
    Typography
} from "@mui/material"

import { useProjects } from "../contexts/ProjectContext"
import ProjectContainer from "../components/ProjectContainer"

export default function Projects() {
    const { projects } = useProjects()

    if ( projects.length === 0 ) {
        return (
            <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
                No Project
            </Typography>
        )
    }

    return (
        <div>
            {projects.map((project, i) => <ProjectContainer key={i} index={i} project={project} />)}
        </div>
    )
}
