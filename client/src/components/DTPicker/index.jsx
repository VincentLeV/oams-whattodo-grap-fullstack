import React from "react"
import { TextField } from "@mui/material"
import { DateTimePicker } from "@mui/lab"

export default function DTPicker({ value, setValue }) {
    return (
        <DateTimePicker
            label="Deadline"
            value={value}
            onChange={(newVal) => setValue(newVal)}
            renderInput={(params) => <TextField {...params} sx={{ mt: 3 }} />}
        />
    )
}
