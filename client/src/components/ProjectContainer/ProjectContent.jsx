import React from "react"
import {
    AccordionDetails,
    Box
} from "@mui/material"

import ProjectTodoContainer from "./ProjectTodoContainer"

export default function ProjectContent({ project, todo }) {
    return (
        <AccordionDetails>
            <Box px={3}>
                <ProjectTodoContainer project={project} todo={todo} />
            </Box>
        </AccordionDetails>
    )
}
