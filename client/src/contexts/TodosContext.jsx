import React, { useState, createContext, useContext } from "react"

const TodosContext = createContext()

export const useTodos = () => useContext( TodosContext )

export default function TodosProvider({ children }) {
    const [ todos, setTodos ] = useState([])

    return (
        <TodosContext.Provider value={{ todos, setTodos }} >
            {children}
        </TodosContext.Provider>
    )
}
