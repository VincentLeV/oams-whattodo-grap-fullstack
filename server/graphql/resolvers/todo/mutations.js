const { uuid } = require('uuidv4')
const { 
    createTodo, 
    updateTodo, 
    deleteTodo,
    deleteTodos
} = require("../../../models/todo")

const todoMutations = {
    addTodo: async (_, args) => {
        const { isCompleted, ...newTodo } = args.input 
        const data = await createTodo({ 
            ...newTodo, 
            id: uuid(),
            is_completed: isCompleted
        })

        return {
            ...data,
            priority: data.priority,
            isCompleted: data.is_completed,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        }
    },
    updateTodo: async (_, args) => {
        const todo = { ...args.input }
        const { isCompleted, ...newTodo } = todo
        const data = await updateTodo(args.id, { ...newTodo, is_completed: isCompleted })

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