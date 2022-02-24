const { getProjectTodos } = require("../../models/projectTodo")

const formatTodos = async (todos) => {
    const allTodos = []
    todos.forEach(todo => {
        const { is_completed, created_at, updated_at, ...newTodo } = todo 

        newTodo.isCompleted = todo.is_completed
        newTodo.createdAt = todo.created_at
        newTodo.updatedAt = todo.updated_at

        allTodos.push(newTodo)
    })
    return allTodos.length === 1 ? allTodos[0] : allTodos
}

const formatProjectTodos = async (projectTodos) => {
    const allTodos = []
    console.log(projectTodos)
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
        const projectTodos = await formatProjectTodos(todos)

        newProject.todos = projectTodos
        newProject.createdAt = project.created_at
        newProject.updatedAt = project.updated_at

        allProjects.push(newProject)
    }

    return allProjects.length === 1 ? allProjects[0] : allProjects
}

module.exports = {
    formatTodos,
    formatProjectTodos,
    formatProjects
}