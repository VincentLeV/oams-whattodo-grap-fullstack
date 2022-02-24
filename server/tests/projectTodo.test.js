const { ApolloServer } = require("apollo-server-express")
const schema = require("../graphql/schema")

describe("Project Todo", () => {
    const testServer = new ApolloServer({
        schema
    })

    const todos = [
        {
            description: "Project Todo 1", 
            deadline: "2022-02-18T08:40:33.268Z", 
            priority: 0
        },
        {
            description: "Project Todo 2", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 1
        }
    ]

    const initialResult = []
    let projectId = ""

    beforeAll(async () => {
        await testServer.executeOperation({
            query: `
                mutation DeleteProjectTodos {
                    deleteProjectTodos {
                        id
                    }
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

        const projectData = await testServer.executeOperation({
            query: `
                mutation AddProject($name: String!) {
                    addProject(name: $name) {
                    id
                    name
                    todos {
                        id
                        description
                    }
                    createdAt
                    updatedAt
                    }
                }
            `,
            variables: { "name": "Project 1" }
        })

        projectId = projectData.data?.addProject?.id

        for (const todo of todos) {
            const result = await testServer.executeOperation({
                query: `
                    mutation AddProjectTodo($projectId: UUID!, $input: TodoInput) {
                        addProjectTodo(projectId: $projectId, input: $input) {
                            id
                            projectId
                        }
                    }
                `,
                variables: { 
                    "projectId": projectId, 
                    "input": todo
                }
            })

            expect(result.errors).toBeUndefined()
            initialResult.push(result.data?.addProjectTodo)
        }

        console.log("🚀 ~ file: projectTodo.test.js ~ line 23 ~ describe ~ initialResult", initialResult)
    })

    it ("returns all project todos", async () => {
        const result = await testServer.executeOperation({
            query: `
                query ProjectTodos($projectId: UUID!) {
                    projectTodos(projectId: $projectId) {
                        id
                        projectId
                    }
                }
            `,
            variables: { "projectId": projectId }
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.projectTodos).toBeDefined()
        expect(result.data?.projectTodos.length).toBe(2)
    })  
    
    it("returns a project todo", async () => {
        const result = await testServer.executeOperation({
            query: `
                query ProjectTodo($projectTodoId: UUID!) {
                    projectTodo(id: $projectTodoId) {
                        id
                        projectId
                        description
                        deadline
                        priority
                        isCompleted
                    }
                }
            `,
            variables: { "projectTodoId": initialResult[0]?.id },
        })
    
        expect(result.errors).toBeUndefined()
        expect(result.data?.projectTodo).toBeDefined()
        expect(result.data?.projectTodo.id).toBe(initialResult[0]?.id)
        expect(result.data?.projectTodo.description).toBe("Project Todo 1")
    })

    it("adds a project todo", async () => {
        const todo = {
            description: "Project Todo 3", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 2
        }

        const result = await testServer.executeOperation({
            query: `
                mutation AddProjectTodo($projectId: UUID!, $input: TodoInput) {
                    addProjectTodo(projectId: $projectId, input: $input) {
                        id
                        projectId
                        description
                        deadline
                        priority
                        isCompleted
                    }
                }
            `,
            variables: { projectId: projectId, "input": todo },
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.addProjectTodo).toBeDefined()
        expect(result.data?.addProjectTodo.id).toBeDefined()
        console.log("🚀 ~ file: projectTodo.test.js ~ line 156 ~ it ~ result.data?.addProjectTodo", result.data?.addProjectTodo)
        expect(result.data?.addProjectTodo.description).toBe("Project Todo 3")
    })

    it("update a todo", async () => {
        const todo = {
            description: "Updated Project Todo", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 2
        }

        const result = await testServer.executeOperation({
            query: `
                mutation UpdateProjectTodo($updateProjectTodoId: UUID!, $input: TodoInput) {
                    updateProjectTodo(id: $updateProjectTodoId, input: $input) {
                        id
                        projectId
                        description
                        deadline
                        priority
                        isCompleted
                    }
                }
            `,
            variables: { "input": todo, "updateProjectTodoId": initialResult[1]?.id },
        })
        
        expect(result.errors).toBeUndefined()
        expect(result.data?.updateProjectTodo).toBeDefined()
        expect(result.data?.updateProjectTodo.id).toBeDefined()
        expect(result.data?.updateProjectTodo.description).toBe("Updated Project Todo")
        expect(result.data?.updateProjectTodo.createdAt).not.toBe(new Date())
    })
})