import { gql } from "@apollo/client"

import { TODO_DETAILS } from "./fragments"

export const ALL_TODOS = gql`
    query Todos {
        todos {
            ...TodoDetails
        }
    }
    ${TODO_DETAILS} 
`