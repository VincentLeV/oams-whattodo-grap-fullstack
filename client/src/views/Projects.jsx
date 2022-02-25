import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"
import { useQuery } from "@apollo/client"

import { ALL_PROJECTS } from "../graphql/projects/queries"
import { ALL_PROJECT_TODOS } from "../graphql/projectTodos/queries"
import ProjectContainer from "../components/ProjectContainer"

export default function Projects() {
    const [ projects, setProjects ] = useState([])
    const projectResult = useQuery(ALL_PROJECTS)
    // const projectTodoResult = useQuery(ALL_PROJECT_TODOS)

    useEffect(() => {
        (async () => {
            const allProjects = await projectResult?.data?.projects
            console.log("🚀 ~ file: Main.jsx ~ line 22 ~ allProjects", allProjects)

            // await projectTodoResult?.data?.projectTodos

            if (allProjects) {
                setProjects(allProjects) 
            }
        })()
    }, [projectResult?.data])

    if ( projects.length === 0 ) {
        return (
            <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
                No Project
            </Typography>
        )
    }

    if ( projectResult.loading ) return <div>Loading...</div>
    // if ( projectTodoResult.loading ) return <div>Loading...</div>

    return (
        <div>
            {projects.map((project, i) => <ProjectContainer key={project.id} index={i} project={project} />)}
        </div>
    )
}
