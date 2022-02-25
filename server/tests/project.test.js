const { ApolloServer } = require("apollo-server-express")
const schema = require("../graphql/schema")

describe("Project", () => {
    const testServer = new ApolloServer({
        schema
    })

    const projects = [
        { name: "First Project" },
        { name: "Second Project" }
    ]

    const initialResult = []

    beforeAll(async () => {
        await testServer.executeOperation({
            query: `
                mutation Mutation {
                    deleteProjectTodos
                }
            `
        })

        await testServer.executeOperation({
            query: `
                mutation Mutation {
                    deleteProjects
                }
            `
        })

        for (const project of projects) {
            const result = await testServer.executeOperation({
                query: `
                    mutation AddProject($name: String!) {
                        addProject(name: $name) {
                            id
                            name
                            todos {
                                id
                                description
                            }
                        }
                    }
                `,
                variables: { "name": project.name }
            })

            expect(result.errors).toBeUndefined()
            initialResult.push(result.data?.addProject)
        }

        console.log("🚀 ~ file: project.test.js ~ line 15 ~ describe ~ initialResult", initialResult)
    })

    it ("returns all projects", async () => {
        const result = await testServer.executeOperation({
            query: `
                query Projects {
                    projects {
                        id
                        name
                        todos {
                            id
                            description
                        }
                    }
                }
            `,
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.projects).toBeDefined()
        expect(result.data?.projects.length).toBe(2)
    })  
    
    it("returns a project", async () => {
        const result = await testServer.executeOperation({
            query: `
                query Project($projectId: UUID!) {
                    project(id: $projectId) {
                        id
                        name
                        todos {
                            id
                            description
                        }
                    }
                }
            `,
            variables: { "projectId": initialResult[0]?.id },
        })
        
        expect(result.errors).toBeUndefined()
        expect(result.data?.project).toBeDefined()
        expect(result.data?.project.id).toBe(initialResult[0]?.id)
        expect(result.data?.project.name).toBe("First Project")
        expect(result.data?.project.todos.length).toBe(0)
    })

    it("adds a project", async () => {
        const result = await testServer.executeOperation({
            query: `
                mutation AddProject($name: String!) {
                    addProject(name: $name) {
                        id
                        name
                        todos {
                            id
                            description
                            deadline
                        }
                    }
                }
            `,
            variables: { "name": "New Project" },
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.addProject).toBeDefined()
        expect(result.data?.addProject.id).toBeDefined()
        expect(result.data?.addProject.name).toBe("New Project")
    })

    it("update a project", async () => {
        const result = await testServer.executeOperation({
            query: `
                mutation UpdateProject($project: ProjectInput) {
                    updateProject(project: $project) {
                        id
                        name
                        todos {
                            id
                        }
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: { 
                "project": {
                    name: "Edited Project",
                    id: initialResult[1]?.id
                }
            },
        })
        
        expect(result.errors).toBeUndefined()
        expect(result.data?.updateProject).toBeDefined()
        expect(result.data?.updateProject.id).toBeDefined()
        expect(result.data?.updateProject.name).toBe("Edited Project")
        expect(result.data?.updateProject.createdAt).not.toBe(new Date())
    })
})