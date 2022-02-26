import React, { useState } from "react"
import {
    Stack,
    Typography,
    Box
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import { useMutation } from "@apollo/client"

import { DELETE_PROJECT } from "../../graphql/projects/mutations"
import { ALL_PROJECTS } from "../../graphql/projects/queries"
import { ALL_PROJECT_TODOS } from "../../graphql/projectTodos/queries"
import AddProjectTodoModal from "../AddProjectTodoModal"
import EditProjectModal from "../EditProjectModal"
import { useToast } from "../../contexts/ToastContext"

export default function ProjectToolbar({ project }) {
    const { setToast } = useToast()
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false)

    const [ deleteProject ] = useMutation( DELETE_PROJECT, {
        refetchQueries: [{ query: ALL_PROJECTS }, { query: ALL_PROJECT_TODOS, variables: { projectId: project.id } }],
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
    })

    const handleDeleteProject = async () => {
        try {
            if ( window.confirm("Do you really want to delete this project and all of its tasks?") ) {
                deleteProject({ 
                    variables: { 
                        deleteProjectId: project.id, 
                    } 
                })
            }
        } catch (err) {
            setToast({ 
                show: true, 
                msg: err.response?.data?.message, 
                severity: "error" 
            })
        }
    }

    const handleEditProject = async () => {
        setIsEditModalOpen(true)
    }

    return (
        <Box>
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
            >
                <Stack 
                    className="add-project-todo-btn"
                    direction="row" 
                    alignItems="center" 
                    my={2}
                    ml={2}
                    onClick={() => setIsModalOpen(true)}
                    sx={{ cursor: "pointer" }}
                >
                    <AddIcon sx={{ color: "gray" }} />
                    <Typography 
                        variant="subtitle2" 
                        component="p" 
                        sx={{ ml: 1, color: "gray" }}
                    >
                        Add task
                    </Typography>
                </Stack>

                <Stack direction="row">
                    <Stack
                        className="edit-project-todo-btn"
                        direction="row" 
                        alignItems="center" 
                        my={2}
                        mr={2}
                        onClick={handleEditProject}
                        sx={{ cursor: "pointer" }}
                    >
                        <EditRoundedIcon 
                            sx={{ 
                                fontSize: "18px",
                                marginLeft: "10px",
                                color: "gray",
                            }} 
                        />
                        <Typography 
                            variant="subtitle2" 
                            component="p" 
                            sx={{ ml: 0.5, color: "gray" }}
                        >
                            Edit
                        </Typography>
                    </Stack>

                    <Stack
                        className="delete-project-btn"
                        direction="row" 
                        alignItems="center" 
                        my={2}
                        mr={3}
                        onClick={handleDeleteProject}
                        sx={{ cursor: "pointer" }}
                    >
                        <DeleteSweepRoundedIcon sx={{ fontSize: "20px", color: "#D22B2B" }} />
                        <Typography 
                            variant="subtitle2" 
                            component="p" 
                            sx={{ ml: 0.5, color: "#D22B2B" }}
                        >
                            Delete
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            
            <AddProjectTodoModal
                project={project}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <EditProjectModal
                project={project}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
            />
        </Box>
        
    )
}
