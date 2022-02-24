import { gql } from "@apollo/client"

import { PROJECT_TODO_DETAILS } from "../fragments"

export const ADD_PROJECT = gql`
    mutation AddProject($name: String!) {
        addProject(name: $name) {
            id
            name
            todos {
                ...ProjectTodoDetails
            }
            createdAt
            updatedAt
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($project: ProjectInput) {
        updateProject(project: $project) {
            id
            name
            todos {
                ...ProjectTodoDetails
            }
            createdAt
            updatedAt
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject($deleteProjectId: UUID!) {
        deleteProject(id: $deleteProjectId)
    }
`