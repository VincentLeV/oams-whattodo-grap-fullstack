const { uuid } = require('uuidv4')
const { 
    createProjectTodo,
    updateProjectTodo,
    deleteProjectTodo
} = require("../../../models/projectTodo")

const projectTodoMutations = {
    addProjectTodo: async (_, args) => {
        const { isCompleted, ...newTodo } = args.input
        const data = await createProjectTodo({ 
            ...newTodo,
            project_id: args.projectId, 
            id: uuid(),
            is_completed: isCompleted
        })
        console.log(data)

        return {
            ...data,
            projectId: data.project_id,
            priority: data.priority,
            isCompleted: data.is_completed,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        }
    },
    updateProjectTodo: async (_, args) => {
        const todo = { ...args.input }
        const { isCompleted, ...newTodo } = todo
        const data = await updateProjectTodo(args.id, { ...newTodo, is_completed: isCompleted })

        return {
            ...data,
            projectId: data.project_id,
            isCompleted: data.is_completed,
            createdAt: data.created_at,
            updatedAt: data.created_at
        }
    },
    deleteProjectTodo: async (_, args) => {
        const data = await deleteProjectTodo(args.id)
        return { id: data.id }
    },
    deleteProjectTodos: async () => await deleteTodos()
}

module.exports = projectTodoMutations