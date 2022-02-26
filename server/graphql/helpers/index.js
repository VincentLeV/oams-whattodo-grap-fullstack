const { getProjectTodos } = require("../../models/projectTodo")

const formatTodos = (todos) => {
    const allTodos = []

    for (const todo of todos) {
        const { is_completed, created_at, updated_at, ...newTodo } = todo 

        newTodo.isCompleted = todo.is_completed
        newTodo.createdAt = todo.created_at
        newTodo.updatedAt = todo.updated_at

        allTodos.push(newTodo)
    }
    console.log(allTodos)
    return allTodos
}

const formatProjectTodos = (projectTodos) => {
    const allTodos = []

    for (const todo of projectTodos) {
        const { is_completed, created_at, updated_at, project_id, ...newTodo } = todo 

        newTodo.projectId = todo.project_id
        newTodo.isCompleted = todo.is_completed
        newTodo.createdAt = todo.created_at
        newTodo.updatedAt = todo.updated_at

        allTodos.push(newTodo)
    }
    return allTodos
}

const formatProjects = async (projects) => {
    const allProjects = []

    for (const project of projects) {
        if (!project.id) return
        const { is_completed, created_at, updated_at, ...newProject } = project
        const todos = await getProjectTodos(project.id)

        if (todos.length !== 0) {
            const projectTodos = formatProjectTodos(todos)
            newProject.todos = projectTodos
        } else {
            newProject.todos = []
        }
        newProject.createdAt = project.created_at
        newProject.updatedAt = project.updated_at
        allProjects.push(newProject)
    }
    
    return allProjects
}

module.exports = {
    formatTodos,
    formatProjectTodos,
    formatProjects
}