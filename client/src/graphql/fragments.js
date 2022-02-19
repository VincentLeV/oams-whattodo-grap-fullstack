import { gql } from "@apollo/client"

export const TODO_DETAILS = gql`
    fragment TodoDetails on Todo {
        id
        description
        deadline
        priority
        isCompleted
    }
`