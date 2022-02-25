const { 
    getProjectTodos,
    getProjectTodo
} = require("../../../models/projectTodo")
const { formatProjectTodos } = require("../../helpers")

const projectTodoQueries = {
    projectTodos: async (_, args) => {
        const todos = await getProjectTodos(args.projectId)
        const formattedTodos = formatProjectTodos(todos)
        return formattedTodos
    },
    projectTodo: async (_, args) => {
        const todos = await getProjectTodo(args.id)
        if (todos.length === 0) throw new Error("Error. Project Todo doesn't exist")
        const formattedTodos = formatProjectTodos(todos)
        
        return formattedTodos[0]
    },
    projectTodoCount: async (_, args) => {
        const todos = await getProjectTodos(args.projectId)
        return todos.length
    } 
}

module.exports = projectTodoQueries