import ReactDOM from "react-dom"
import React from "react"
import App from "./App"

import { ApolloProvider } from "@apollo/client"
import { client } from "./graphql-client"

ReactDOM.render(
    <ApolloProvider client={client}>
        <App /> 
    </ApolloProvider>,
    document.getElementById("root")
)
