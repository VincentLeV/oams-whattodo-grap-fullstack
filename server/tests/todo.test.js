const { ApolloServer } = require("apollo-server-express")
const schema = require("../graphql/schema")

describe("Todo", () => {
    const testServer = new ApolloServer({
        schema
    })

    const todos = [
        {
            description: "Test 1", 
            deadline: "2022-02-18T08:40:33.268Z", 
            priority: 0
        },
        {
            description: "Test 2", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 1
        }
    ]

    const initialResult = []

    beforeAll(async () => {
        await testServer.executeOperation({
            query: `
                mutation DeleteTodos {
                    deleteTodos {
                        id
                    }
                }
            `
        })

        for (const todo of todos) {
            const result = await testServer.executeOperation({
                query: `
                    mutation AddTodo($input: TodoInput) {
                        addTodo(input: $input) {
                            id
                            description
                            deadline
                            priority
                            isCompleted
                        }
                    }
                `,
                variables: { "input": todo }
            })

            expect(result.errors).toBeUndefined()
            initialResult.push(result.data?.addTodo)
        }

        console.log("🚀 ~ file: todo.test.js ~ line 23 ~ describe ~ initialResult", initialResult)
    })

    it ("returns all todos", async () => {
        const result = await testServer.executeOperation({
            query: `
                query Todos {
                    todos {
                        id
                        description
                        deadline
                        priority
                        isCompleted
                    }
                }
            `,
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.todos).toBeDefined()
        expect(result.data?.todos.length).toBe(2)
    })  
    
    it("returns a todo", async () => {
        const result = await testServer.executeOperation({
            query: `
                query Todo($todoId: UUID!) {
                    todo(id: $todoId) {
                        id
                        description
                        deadline
                        priority
                        isCompleted
                    }
                }
            `,
            variables: { "todoId": initialResult[0]?.id },
        })
    
        expect(result.errors).toBeUndefined()
        expect(result.data?.todo).toBeDefined()
        expect(result.data?.todo.id).toBe(initialResult[0]?.id)
        expect(result.data?.todo.description).toBe("Test 1")
    })

    it("adds a todo", async () => {
        const todo = {
            description: "Test 3", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 2
        }

        const result = await testServer.executeOperation({
            query: `
                mutation AddTodo($input: TodoInput){
                    addTodo(input: $input) {
                        id
                        description
                        deadline
                        priority
                        isCompleted
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: { "input": todo },
        })

        expect(result.errors).toBeUndefined()
        expect(result.data?.addTodo).toBeDefined()
        expect(result.data?.addTodo.id).toBeDefined()
        expect(result.data?.addTodo.description).toBe("Test 3")
    })

    it("update a todo", async () => {
        const todo = {
            description: "Edited Todo", 
            deadline: "2022-02-19T08:40:33.268Z", 
            priority: 2
        }

        const result = await testServer.executeOperation({
            query: `
                mutation UpdateTodo($input: TodoInput, $updateTodoId: UUID!) {
                    updateTodo(input: $input, id: $updateTodoId) {
                        id
                        description
                        deadline
                        priority
                        isCompleted
                        createdAt
                        updatedAt
                    }
                }
            `,
            variables: { "input": todo, "updateTodoId": initialResult[1]?.id },
        })
        
        expect(result.errors).toBeUndefined()
        expect(result.data?.updateTodo).toBeDefined()
        expect(result.data?.updateTodo.id).toBeDefined()
        expect(result.data?.updateTodo.description).toBe("Edited Todo")
        expect(result.data?.updateTodo.createdAt).not.toBe(new Date())
    })
})