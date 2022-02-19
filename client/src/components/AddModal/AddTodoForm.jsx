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
import { useMutation } from "@apollo/client"

import { ADD_TODO } from "../../graphql/mutations"
import { ALL_TODOS } from "../../graphql/queries"
import { useTodos } from "../../contexts/TodosContext"
import { sortTodos } from "../../utils/helpers"
import PriorityMenu from "../PriorityMenu"
import { useToast } from "../../contexts/ToastContext"
import DTPicker from "../DTPicker"

export default function AddTodoForm({ setIsModalOpen }) {
    const { setTodos } = useTodos()
    const { setToast } = useToast()
    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ values, setValues ] = useState({ desc: "" })
    const [ priority, setPriority ] = useState({ label: "", value: 0, color: "" })
    const [ deadline, setDeadline ] = useState(new Date()) 

    const [ createTodo ] = useMutation( ADD_TODO, {
        onError: (err) => setToast({ 
            show: true, 
            msg: err?.message, 
            severity: "error" 
        }),
        update: (store, res) => {
            try {
                const dataInStore = store.readQuery({ query: ALL_TODOS })
                const newTodos = [ ...dataInStore.todos, res.data.addTodo ]

                store.writeQuery({
                    query: ALL_TODOS,
                    data: {
                        ...dataInStore,
                        todos: sortTodos(newTodos, "priority")
                    }
                })
            } catch (err) {
                setToast({ 
                    show: true, 
                    msg: err?.graphQLErrors[0]?.message, 
                    severity: "error" 
                })
            }
        }
    })

    const handleChange = (type) => (e) => {
        setValues({ ...values, [type]: e.target.value })
    }

    const handleAddTodo = () => {
        setValues({ desc: "" })

        const newTodo = { description: values.desc, priority: priority.value, deadline: deadline }
        createTodo({ variables: { input: newTodo } })
        setIsModalOpen(false)

        setToast({ show: true, msg: "Successfully added new todo", severity: "success" })
    }

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="task-description">Description</InputLabel>
                <OutlinedInput
                    id="todo-description-input"
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
                onClick={handleAddTodo}
            >
                Add Todo
            </Button>
        </Box>
    )
}
