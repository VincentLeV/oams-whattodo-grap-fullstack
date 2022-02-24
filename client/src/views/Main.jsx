import React from "react"
import { TabPanel } from "@mui/lab"

import Projects from "./Projects"
import QuickTodos from "./QuickTodos"

export default function Main() {
    return (
        <main>
            <TabPanel value="1">
                <QuickTodos />
            </TabPanel>
            <TabPanel value="2">
                <Projects />
            </TabPanel>
        </main>
    )
}
