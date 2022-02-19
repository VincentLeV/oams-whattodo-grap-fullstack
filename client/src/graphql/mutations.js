import { gql } from "@apollo/client"

import { TODO_DETAILS } from "./fragments"

export const ADD_TODO = gql`
    mutation AddTodo($input: TodoInput){
        addTodo(input: $input) {
            ...TodoDetails
        }
    }
    ${TODO_DETAILS}
`
export const UPDATE_TODO = gql`
    mutation UpdateTodo($updateTodoId: UUID!, $input: TodoInput) {
        updateTodo(id: $updateTodoId, input: $input) {
            ...TodoDetails
        }
    }
    ${TODO_DETAILS}
`

export const DELETE_TODO = gql`
    mutation DeleteTodo($deleteTodoId: UUID!) {
        deleteTodo(id: $deleteTodoId) {
            id
        }
    }
`