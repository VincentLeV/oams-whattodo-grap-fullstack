import { gql } from "@apollo/client"

import { PROJECT_TODO_DETAILS } from "../fragments"

export const ADD_PROJECT_TODO = gql`
    mutation AddProjectTodo($projectId: UUID!, $input: TodoInput) {
        addProjectTodo(projectId: $projectId, input: $input) {
            ...ProjectTodoDetails
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const UPDATE_PROJECT_TODO = gql`
    mutation UpdateProjectTodo($updateProjectTodoId: UUID!, $input: TodoInput) {
        updateProjectTodo(id: $updateProjectTodoId, input: $input) {
            ...ProjectTodoDetails
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const DELETE_PROJECT_TODO = gql`
    mutation DeleteProjectTodo($deleteProjectTodoId: UUID!) {
        deleteProjectTodo(id: $deleteProjectTodoId)
    }
`