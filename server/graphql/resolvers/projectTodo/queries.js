const { 
    getAllProjectTodos,
    getProjectTodos,
    getProjectTodo
} = require("../../../models/projectTodo")
const { formatProjectTodos } = require("../../helpers")

const projectTodoQueries = {
    projectTodos: async () => {
        const todos = await getAllProjectTodos()
        const formattedTodos = await formatProjectTodos(todos)
        return formattedTodos
    },
    projectTodosOfProject: async (_, args) => {
        const todos = await getProjectTodos(args.projectId)
        const formattedTodos = await formatProjectTodos(todos)
        return formattedTodos
    },
    projectTodoOfProject: async (_, args) => {
        const todos = await getProjectTodo(args.id)
        if (todos.length === 0) throw new Error("Error. Project Todo doesn't exist")
        const formattedTodos = await formatProjectTodos(todos)
        
        return formattedTodos[0]
    },
    projectTodoCount: async (_, args) => {
        const todos = await getProjectTodos(args.projectId)
        return todos.length
    } 
}

module.exports = projectTodoQueries