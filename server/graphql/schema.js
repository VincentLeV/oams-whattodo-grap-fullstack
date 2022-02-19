const { makeExecutableSchema } = require("@graphql-tools/schema")
const { gql } = require("apollo-server-express")
const resolvers = require("./resolvers")
const { Todo, Common } = require("./typeDefs")

const Query = gql`
	type Query {
        todos: [Todo]!
        todo(id: Int!): Todo!
        todoCount: Int!
    }
`

const Mutation = gql`
    type Mutation {
        addTodo(input: TodoInput): Todo
        updateTodo(id: Int!, input: TodoInput): Todo
        deleteTodo(id: Int!): TodoId
        deleteTodos: [TodoId]
    }
`

const schema = makeExecutableSchema({
    typeDefs: [Query, Mutation, Todo, Common],
    resolvers
})

module.exports = schema