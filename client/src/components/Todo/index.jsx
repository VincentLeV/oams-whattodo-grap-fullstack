import React, { useState } from "react"
import {
    ListItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    IconButton,
    Stack
} from "@mui/material"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"

import TodoContent from "./TodoContent"
import EditTodoMenu from "../EditTodoMenu"
import EditTodoModal from "../EditTodoModal"
import EditProjectTodoMenu from "../EditProjectTodoMenu"

export default function Todo({ from, todo, project, handleChange }) {
    const [ anchor, setAnchor ] = useState(null)
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    return (
        <ListItem disablePadding>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ width: "100%" }}>
                <FormGroup sx={{ width: "100%" }}>
                    <FormControlLabel 
                        sx={{ alignItems: "flex-start" }}
                        control={
                            <Checkbox 
                                checked={Boolean(todo?.isCompleted)} 
                                onChange={handleChange} 
                                name={todo.id ? todo.id : todo._id}  
                                color="warning"
                            />
                        } 
                        label={<TodoContent from={from} todo={todo} />}
                    />
                </FormGroup>

                <IconButton className="edit-todo-btn" onClick={(e) => setAnchor(e.currentTarget)}>
                    <MoreHorizRoundedIcon sx={{ "&:hover": { color: "blue" } }} />
                </IconButton>
            </Stack>

            {
                from === "quickTodo"
                    ? <EditTodoMenu 
                        todo={todo}
                        anchor={anchor} 
                        setAnchor={setAnchor} 
                        setIsModalOpen={setIsModalOpen} 
                    />
                    : <EditProjectTodoMenu 
                        // project={project}
                        todo={todo}
                        anchor={anchor} 
                        setAnchor={setAnchor} 
                        setIsModalOpen={setIsModalOpen} 
                    />
            }

            <EditTodoModal 
                from={from}
                project={project}
                todo={todo} 
                isModalOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
                setAnchor={setAnchor} 
            />
        </ListItem> 
    )
}
