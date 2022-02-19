const db = require("../index")

const getTodos = async () => {
    const todos = await db("todo")
    return todos
}

const getTodo = async (id) => {
    const todos = await db("todo").where("id", id)
    return todos[0]
}   

const createTodo = async (todo) => {
    const todos = await db("todo").insert(todo).returning("*")

    if (!todos) throw new Error("Error. Can't create todo")
    return todos[0]
}

const updateTodo = async (id, todo) => {
    const todos = await db("todo")
        .where({ id: id })
        .update({
            ...todo,
            updated_at: new Date()
        })
        .returning("*")
    return todos[0]
}

const deleteTodo = async (todoId) => {
    const [id] = await db("todo")
        .del()
        .where({ id: todoId })
        .returning("id")

    if (!id) throw new Error("Error. Todo does not exist")
    return id
}

const deleteTodos = async () => {
    const todos = await db("todo")
    const todoIds = []
    for (const todo of todos) {
        const [id] = await db("todo")
            .where("id", todo.id)
            .del()
            .returning("id")
        todoIds.push(id)
    }

    return todoIds
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteTodos
}