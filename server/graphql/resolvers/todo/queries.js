const { getTodos, getTodo } = require("../../../models/todo")
const { formatTodos } = require("../../helpers")

const todoQueries = {
    todos: async () => {
        const todos = await getTodos()
        const formattedTodos = await formatTodos(todos)
        return formattedTodos
    },
    todo: async (_, args) => {
        const todo = await getTodo(args.id)
        if (todo.length === 0) throw new Error("Error. Todo doesn't exist")

        return formatTodos(todo)
    },
    todoCount: async () => {
        const todos = await getTodos()
        return todos.length
    } 
}

module.exports = todoQueries