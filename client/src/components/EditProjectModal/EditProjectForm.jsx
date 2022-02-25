import React, { useState, useEffect } from "react"
import {
    Box,
    FormControl,
    TextField,
    Button
} from "@mui/material"
import { useMutation } from "@apollo/client"

import { UPDATE_PROJECT } from "../../graphql/projects/mutations"
import { ALL_PROJECTS, SINGLE_PROJECT } from "../../graphql/projects/queries"
import { useToast } from "../../contexts/ToastContext"

export default function EditProjectForm({ project, setIsEditModalOpen }) {
    const [ values, setValues ] = useState({ name: "" })
    const { setToast } = useToast()

    const [ updateProject ] = useMutation( UPDATE_PROJECT, {
        // refetchQueries: [{ query: ALL_PROJECTS }],
        refetchQueries: [{ query: SINGLE_PROJECT, variables: {projectId: project.id} }],
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
    })

    useEffect(() => {
        setValues({ name: project.name })
    }, [project.name])

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleEditProject = async () => {
        try {
            updateProject({
                variables: {
                    project: { id: project.id, name: values.name } 
                }
            })
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
