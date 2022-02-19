const {
    getTodos, getTodo,
} = require("../../../db/todoHelpers")

const todoQueries = {
    todos: async () => {
        const todos = await getTodos()
        const allTodos = []
        todos.forEach(todo => {
            const { is_completed, created_at, updated_at, ...newTodo } = todo 

            newTodo.isCompleted = todo.is_completed
            newTodo.createdAt = todo.created_at
            newTodo.updatedAt = todo.updated_at

            allTodos.push(newTodo)
        })
        return allTodos
    },
    todo: async (_, args) => {
        const todo = await getTodo(args.id)
        if (!todo) throw new Error("Error. Todo doesn't exist")

        const { is_completed, created_at, updated_at, ...newTodo } = todo 

        newTodo.isCompleted = todo.is_completed
        newTodo.createdAt = todo.created_at
        newTodo.updatedAt = todo.updated_at

        return newTodo
    },
    todoCount: async () => {
        const todos = await getTodos()
        return todos.length
    } 
}

module.exports = todoQueries