import React from "react"
import {
    AccordionSummary,
    Typography,
    Stack
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function ProjectHeader({ index, project }) {
    return (
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`project-${index}-content`}
            id={`project-${index}-header`}
            sx={{ margin: 0 }}
        >
            <Stack direction="row" alignItems="center">
                <Typography 
                    variant="body1" 
                    component="h2" 
                    color="primary" 
                    sx={{ fontWeight: "bold" }}
                >
                    {project.name}
                </Typography>

                <Typography 
                    variant="caption" 
                    component="p" 
                    sx={{ ml: 2, color: "gray" }}
                >
                    {project.todos.length} tasks
                </Typography>
            </Stack>
        </AccordionSummary>
    )
}
