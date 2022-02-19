import React, { useState, useEffect } from "react"
import {
    Typography,
    Stack,
    Box
} from "@mui/material"
import moment from "moment"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"

import priorityList from "../../constants/priority"

export default function TodoContent({ todo }) {
    const [ color, setColor ] = useState("")

    useEffect(() => {
        if ( !todo.priority ) return

        const found = priorityList.find(item => item.value === todo.priority)
        setColor(found.color)
    }, [todo])

    if ( !todo ) return

    return (
        <Stack alignItems="flex-start" justifyContent="space-between" mt={1}>
            <Box className="todo-description">
                <Typography 
                    sx={{ 
                        textDecoration: todo.isCompleted ? "line-through" : "none" 
                    }} 
                >
                    {todo.description}
                </Typography>  
            </Box>
            
            <Stack direction="row">
                {todo.priority && !todo.isCompleted ? <FlagRoundedIcon className="priority-flag" sx={{ fontSize: 15, mr: 1 }} color={color} /> : null}

                {
                    !todo.isCompleted
                        ? <Typography variant="caption" sx={{ color: "orange" }}>
                            {moment(todo.deadline).format("DD-MM-YYYY hh:mm A")}
                        </Typography>
                        : null
                }
            </Stack>
        </Stack>
    )
}
