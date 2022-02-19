import React, { useState } from "react"
import {
    Box, 
    Tab,
} from "@mui/material"
import {
    TabContext,
    TabList
} from "@mui/lab"
import BallotRoundedIcon from "@mui/icons-material/BallotRounded"
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded"

import Main from "../../views/Main"

export default function TabMenu() {
    const [ index, setTabIndex ] = useState("1")

    const handleChange = (e, i) => setTabIndex(i)

    return (
        <TabContext value={index}>
            <Box>
                <TabList onChange={handleChange} aria-label="Menu Tabs" centered>
                    <Tab icon={<BallotRoundedIcon />} id="todo-tab" iconPosition="start" label="Todos" value="1" />
                    <Tab icon={<AccountTreeRoundedIcon />} id="project-tab" iconPosition="start" label="Projects" value="2" />
                </TabList>
            </Box>

            <Main />
        </TabContext>
    )
}
