import React, { useState } from "react"
import {
    Box,
    FormControl,
    TextField,
    Button
} from "@mui/material"

import { useToast } from "../../contexts/ToastContext"
import { useProjects } from "../../contexts/ProjectContext"

export default function AddProjectForm({ setIsModalOpen }) {
    const [ values, setValues ] = useState({})
    const { setToast } = useToast()
    const { projects, setProjects } = useProjects()

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleAddProject = async () => {
        try {
            // const project = await Axios.createProject(values)
            const project = {}
            setProjects([ ...projects, project ])
            setIsModalOpen(false)

            setToast({ show: true, msg: "Successfully added new project", severity: "success" })
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
                    onChange={handleChange("name")}
                />
            </FormControl>

            <Button 
                id="add-project-btn"
                sx={{ mt: 3, mb: 1 }}
                variant="contained" 
                size="medium"
                onClick={handleAddProject}
            >
                Add Project
            </Button>
        </Box>
    )
}
