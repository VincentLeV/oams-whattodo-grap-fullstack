const { UserInputError } = require("apollo-server-express")
const { 
    createTodo, 
    updateTodo, 
    deleteTodo,
    deleteTodos
} = require("../../../db/todoHelpers")

const todoMutations = {
    addTodo: async (_, args) => {
        const todo = { ...args.input, is_completed: false }
        const data = await createTodo(todo)

        return {
            ...data,
            priority: data.priority ? data.priority : 0,
            isCompleted: data.isCompleted ? data.isCompleted: false,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        }
    },
    updateTodo: async (_, args) => {
        const todo = { ...args.input }
        const data = await updateTodo(args.id, todo)

        return {
            ...data,
            isCompleted: data.is_completed,
            createdAt: data.created_at,
            updatedAt: data.created_at
        }
    },
    deleteTodo: async (_, args) => {
        const data = await deleteTodo(args.id)
        return { id: data.id }
    },
    deleteTodos: async () => await deleteTodos()
}

module.exports = todoMutations