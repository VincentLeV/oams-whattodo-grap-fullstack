import React, { useState } from "react"
import {
    Box,
    FormControl,
    TextField,
    Button
} from "@mui/material"
import { useMutation } from "@apollo/client"

import { ADD_PROJECT } from "../../graphql/projects/mutations"
import { ALL_PROJECTS } from "../../graphql/projects/queries"
import { useToast } from "../../contexts/ToastContext"

export default function AddProjectForm({ setIsModalOpen }) {
    const [ values, setValues ] = useState({})
    const { setToast } = useToast()

    const [ createProject ] = useMutation( ADD_PROJECT, {
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
        update: (store, res) => {
            try {
                const dataInStore = store.readQuery({ query: ALL_PROJECTS })
                const newProjects = [ ...dataInStore.projects, res.data.addProject ]

                store.writeQuery({
                    query: ALL_PROJECTS,
                    data: {
                        ...dataInStore,
                        projects: newProjects
                    }
                })
            } catch (err) {
                setToast({ 
                    show: true, 
                    msg: err?.message, 
                    severity: "error" 
                })
            }
        }
    })

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleAddProject = async () => {
        try {
            createProject({ variables: { name: values.name } })
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
