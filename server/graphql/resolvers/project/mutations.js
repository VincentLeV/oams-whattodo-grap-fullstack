const { uuid } = require('uuidv4')
const {
    getProject,
    createProject,
    updateProject,
    deleteProject,
    deleteProjects
} = require("../../../models/project")
const { deleteProjectTodosOfProject } = require("../../../models/projectTodo")
const { formatProjects } = require("../../helpers")

const projectMutations = {
    addProject: async (_, args) => {
        const data = await createProject({ 
            name: args.name,
            id: uuid()
        })

        return {
            ...data,
            todos: [],
            createdAt: data.created_at,
            updatedAt: data.updated_at
        }
    },
    updateProject: async (_, args) => {
        const project = await getProject(args.project.id)
        const formattedProject = await formatProjects(project)
        
        const data = await updateProject(args.project)

        return {
            ...data,
            todos: formattedProject.todos,
            createdAt: data.created_at,
            updatedAt: data.created_at
        }
    },
    deleteProject: async (_, args) => {
        await deleteProjectTodosOfProject(args.id)
        const data = await deleteProject(args.id)
        return { id: data.id }
    },
    deleteProjects: async () => await deleteProjects()
}

module.exports = projectMutations