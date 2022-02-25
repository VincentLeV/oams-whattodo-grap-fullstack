const db = require("../db")

const getProjectTodos = async (projectId) => {
    const todos = await db("project_todos").where("project_id", projectId)
    return todos
}

const getProjectTodo = async (id) => {
    const todos = await db("project_todos").where("id", id)
    return todos
}   

const createProjectTodo = async (todo) => {
    const todos = await db("project_todos").insert(todo).returning("*")

    if (!todos) throw new Error("Error. Can't create todo")
    return todos[0]
}

const updateProjectTodo = async (id, projectTodo) => {
    const todos = await db("project_todos")
        .where({ id: id })
        .update({
            ...projectTodo,
            updated_at: new Date()
        })
        .returning("*")
    return todos[0]
}

const deleteProjectTodo = async (todoId) => {
    const [id] = await db("project_todos")
        .del()
        .where({ id: todoId })
        .returning("id")

    if (!id) throw new Error("Error. Project Todo does not exist")
    return id
}

const deleteProjectTodosOfProject = async (projectId) => {
    const todos = await db("project_todos")
    const todoIds = []
    for (const todo of todos) {
        const [id] = await db("project_todos")
            .where("project_id", projectId)
            .del()
            .returning("id")
        todoIds.push(id)
    }

    return todoIds
}

const deleteProjectTodos = async () => {
    const todos = await db("project_todos")
    const todoIds = []
    for (const todo of todos) {
        const [id] = await db("project_todos")
            .where("id", todo.id)
            .del()
            .returning("id")
        todoIds.push(id)
    }

    return todoIds
}

module.exports = {
    getProjectTodos,
    getProjectTodo,
    createProjectTodo,
    updateProjectTodo,
    deleteProjectTodo,
    deleteProjectTodosOfProject,
    deleteProjectTodos
}