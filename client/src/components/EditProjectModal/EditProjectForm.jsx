import React, { useState, useEffect } from "react"
import {
    Box,
    FormControl,
    TextField,
    Button
} from "@mui/material"

// import Axios from "../../services/axios"
import { useProjects } from "../../contexts/ProjectContext"
import { useToast } from "../../contexts/ToastContext"

export default function EditProjectForm({ project, setIsEditModalOpen }) {
    const [ values, setValues ] = useState({ name: "" })
    const { projects } = useProjects()
    const { setToast } = useToast()

    useEffect(() => {
        const savedProject = projects.find(p => p.id === project.id)
        setValues({ name: savedProject.name })
    }, [])

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleEditProject = async () => {
        try {
            const newProject = { ...values, todos: project.todos }
            // await Axios.updateProject(project.id, newProject)
            const index = projects.findIndex(p => p.id === project.id)
            projects.splice(index, 1, newProject)
            setIsEditModalOpen(false)

            setToast({ show: true, msg: "Successfully edited project", severity: "success" })
        } catch (err) {
            setToast({ 
                show: true, 
                msg: err.response?.data?.message, 
                severity: "error" 
            })
        }
    }

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
                <TextField 
                    id="project-name" 
                    label="Name" 
                    variant="outlined" 
                    value={values.name}
                    onChange={handleChange("name")}
                />
            </FormControl>

            <Button 
                id="edit-project-btn"
                sx={{ mt: 3, mb: 1 }}
                variant="contained" 
                size="medium"
                onClick={handleEditProject}
            >
                Edit Project
            </Button>
        </Box>
    )
}
