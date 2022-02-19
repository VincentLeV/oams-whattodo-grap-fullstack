import React, { useState, useEffect } from "react"
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Stack
} from "@mui/material"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"
import { useMutation } from "@apollo/client"

import { UPDATE_TODO } from "../../graphql/mutations"
import { ALL_TODOS } from "../../graphql/queries"
import { sortTodos } from "../../utils/helpers"
import priorityList from "../../constants/priority"
import PriorityMenu from "../PriorityMenu"
import { useToast } from "../../contexts/ToastContext"
import DTPicker from "../DTPicker"

export default function EditTodoForm({ todo, setIsModalOpen, setAnchor }) {
    const { setToast } = useToast()
    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ values, setValues ] = useState({ desc: todo.description })
    const [ priority, setPriority ] = useState({ label: "", value: todo.priority, color: "" })
    const [ deadline, setDeadline ] = useState(todo.deadline) 

    const [ updateTodo ] = useMutation( UPDATE_TODO, {
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
        update: (store) => {
            try {
                const dataInStore = store.readQuery({ query: ALL_TODOS })
                store.writeQuery({
                    query: ALL_TODOS,
                    data: {
                        ...dataInStore,
                        todos: sortTodos(dataInStore.todos, "priority")
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

    const handleEditTodo = async () => {
        updateTodo({
            variables: {
                updateTodoId: todo.id, 
                input: {
                    description: values.desc,
                    deadline: deadline,
                    priority: priority.value,
                    isCompleted: todo.isCompleted
                }
            }
        })
        setIsModalOpen(false)
        setAnchor(null)

        setToast({ show: true, msg: "Successfully edited todo", severity: "success" })
    }

    useEffect(() => {
        const found = priorityList.find(item => item.value === todo.priority)
        if ( found ) {
            setPriority({ label: found?.label, value: todo.priority, color: found.color })
        }
    }, [todo])

    if ( !todo ) return

    return (
        <Box>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="task-description">Description</InputLabel>
                <OutlinedInput
                    id="task-description"
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

            <Stack direction="row" justifyContent="flex-end">
                <Button 
                    sx={{ mt: 3, mr: 2 }}
                    variant="contained" 
                    color="warning"
                    size="medium"
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </Button>

                <Button 
                    id="edit-todo-btn"
                    sx={{ mt: 3 }}
                    variant="contained" 
                    size="medium"
                    onClick={handleEditTodo}
                >
                    Edit Todo
                </Button>
            </Stack>
        </Box>
    )
}
