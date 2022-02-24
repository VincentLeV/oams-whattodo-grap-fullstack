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

export const PROJECT_TODO_DETAILS = gql`
    fragment ProjectTodoDetails on ProjectTodo {
        id
        projectId
        description
        deadline
        priority
        isCompleted
    }
`