import React, { useState, createContext, useContext } from "react"

const ProjectContext = createContext()

export const useProjects = () => useContext( ProjectContext )

export default function ProjectProvider({ children }) {
    const [ projects, setProjects ] = useState([])

    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    )
}