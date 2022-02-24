import { gql } from "@apollo/client"

import { PROJECT_TODO_DETAILS } from "../fragments"

export const ALL_PROJECT_TODOS = gql`
    query ProjectTodos($projectId: UUID!) {
        projectTodos(projectId: $projectId) {
            ...ProjectTodoDetails
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const PROJECT_TODO = gql`
    query ProjectTodo($projectTodoId: UUID!) {
        projectTodo(id: $projectTodoId) {
            ...ProjectTodoDetails
        }
    }
    ${PROJECT_TODO_DETAILS}
`