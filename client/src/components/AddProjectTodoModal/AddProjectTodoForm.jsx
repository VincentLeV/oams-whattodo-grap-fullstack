import React, { useState } from "react"
import {
    Box,
    FormControl,
    InputLabel, 
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"

// import Axios from "../../services/axios"
import { useProjects } from "../../contexts/ProjectContext"
import PriorityMenu from "../PriorityMenu"
import { useToast } from "../../contexts/ToastContext"
import DTPicker from "../DTPicker"

export default function AddProjectTodoForm({ project, setIsModalOpen }) {
    const { projects, setProjects } = useProjects()
    const { setToast } = useToast()
    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ values, setValues ] = useState({ desc: "" })
    const [ priority, setPriority ] = useState({ label: "", value: 0, color: "" })
    const [ deadline, setDeadline ] = useState(new Date()) 

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleAddProjectTodo = async () => {
        setValues({ desc: "" })

        try {
            const newTodo = { description: values.desc, priority: priority.value, deadline: deadline, isCompleted: false }
            project.todos.push(newTodo)
            // await Axios.updateProject(project.id, project)

            const index = projects.findIndex(p => p.id === project.id)
            const newProjects = [...projects]
            newProjects.splice(index, 1, project)
            setProjects(newProjects)
            setIsModalOpen(false)

            setToast({ show: true, msg: "Successfully added new todo to project", severity: "success" })
        } catch (err) {
            setToast({ 
                show: true, 
                msg: err?.response?.data?.message, 
                severity: "error" 
            })
        }
    }

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="task-description">Description</InputLabel>
                <OutlinedInput
                    id="todo-description"
                    value={values.desc}
                    onChange={handleChange("desc")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-controls="priority-menu"
                                aria-haspopup="true"
                                aria-label="Change Priority"
                                aria-expanded={anchorEl ? "true" : undefined}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                edge="end"
                            >
                                <FlagRoundedIcon color={priority.color} />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Description"
                />

                <PriorityMenu 
                    anchorEl={anchorEl} 
                    setAnchorEl={setAnchorEl}
                    setPriority={setPriority} 
                />

                <DTPicker value={deadline} setValue={setDeadline} />
            </FormControl>

            <Button 
                id="add-todo-btn"
                sx={{ mt: 3, mb: 1 }}
                variant="contained" 
                size="medium"
                onClick={handleAddProjectTodo}
            >
                Add Todo
            </Button>
        </Box>
    )
}
