const db = require("../db")

const getProjects = async () => {
    const projects = await db("projects")
    return projects
}

const getProject = async (id) => {
    const projects = await db("projects").where("id", id)
    return projects
}   

const createProject = async (project) => {
    const projects = await db("projects").insert(project).returning("*")

    if (!projects) throw new Error("Error. Can't create project")
    return projects[0]
}

const updateProject = async (project) => {
    const projects = await db("projects")
        .where("id", project.id)
        .update({
            name: project.name,
            updated_at: new Date()
        })
        .returning("*")
    return projects[0]
}

const deleteProject = async (projectId) => {
    const [id] = await db("projects")
        .del()
        .where({ id: projectId })
        .returning("id")

    if (!id) throw new Error("Error. Project does not exist")
    return id
}

const deleteProjects = async () => {
    const projects = await db("projects")
    const projectIds = []
    for (const project of projects) {
        const [id] = await db("projects")
            .where("id", project.id)
            .del()
            .returning("id")
        projectIds.push(id)
    }

    return projectIds
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    deleteProjects
}