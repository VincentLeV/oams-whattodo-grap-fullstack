import { gql } from "@apollo/client"

import { PROJECT_TODO_DETAILS } from "../fragments"

export const ALL_PROJECTS = gql`
    query Projects {
        projects {
            id
            name
            todos {
                ...ProjectTodoDetails  
            }
        }
    }
    ${PROJECT_TODO_DETAILS}
`

export const SINGLE_PROJECT = gql`
    query Project($projectId: UUID!) {
        project(id: $projectId) {
            id
            name
            todos {
                ...ProjectTodoDetails
            }
        }
    }
    ${PROJECT_TODO_DETAILS}
`