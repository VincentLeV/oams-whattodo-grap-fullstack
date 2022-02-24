const { makeExecutableSchema } = require("@graphql-tools/schema")
const { gql } = require("apollo-server-express")
const resolvers = require("./resolvers")
const { Todo, Project, ProjectTodo, Common } = require("./typeDefs")

const Query = gql`
	type Query {
        todos: [Todo]!
        todo(id: UUID!): Todo!
        projects: [Project]!
        project(id: UUID!): Project!
        projectTodos(projectId: UUID!): [ProjectTodo]
        projectTodo(id: UUID!): ProjectTodo!
        projectCount: Int!
        todoCount: Int!
        projectTodoCount(projectId: UUID!): Int!
    }
`

const Mutation = gql`
    type Mutation {
        addTodo(input: TodoInput): Todo
        updateTodo(id: UUID!, input: TodoInput): Todo
        deleteTodo(id: UUID!): UUID
        deleteTodos: [UUID]
        addProject(name: String!): Project
        updateProject(project: ProjectInput): Project
        deleteProject(id: UUID!): UUID
        deleteProjects: [UUID]
        addProjectTodo(projectId: UUID!, input: TodoInput): ProjectTodo
        updateProjectTodo(id: UUID!, input: TodoInput): ProjectTodo
        deleteProjectTodo(id: UUID!): UUID
        deleteProjectTodosOfProject(projectId: UUID!): [UUID]
        deleteProjectTodos: [UUID]
    }
`

const schema = makeExecutableSchema({
    typeDefs: [Query, Mutation, Todo, Project, ProjectTodo, Common],
    resolvers
})

module.exports = schema