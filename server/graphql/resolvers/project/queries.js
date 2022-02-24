const { getProjects, getProject } = require("../../../models/project")
const { formatProjects } = require("../../helpers")

const projectQueries = {
    projects: async () => {
        const projects = await getProjects()
        return formatProjects(projects)
    },
    project: async (_, args) => {
        const project = await getProject(args.id)
        if (project.length === 0) throw new Error("Error. Project doesn't exist")
        const formattedProjects = await formatProjects(project)
        console.log(formattedProjects)
        return formattedProjects
    },
    projectCount: async () => {
        const projects = await getProjects()
        return projects.length
    } 
}

module.exports = projectQueries