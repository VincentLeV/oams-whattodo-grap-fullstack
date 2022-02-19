import React, { useState, useEffect } from "react"
// import "./styles/app.css"

import { useQuery } from "@apollo/client"
import { ALL_TODOS } from "./graphql/queries"

function App() {
    const allTodos = useQuery( ALL_TODOS )
    console.log(allTodos?.data?.todos)

    if ( allTodos.loading ) return <div>Loading...</div>

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
}

export default App
