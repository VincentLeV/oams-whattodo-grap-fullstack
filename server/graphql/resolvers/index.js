const { todoQueries, todoMutations } = require("./todo")
const { projectQueries, projectMutations } = require("./project")
const { projectTodoQueries, projectTodoMutations } = require("./projectTodo")

const resolvers = {
    Query: {
        ...todoQueries,
        ...projectQueries,
        ...projectTodoQueries
    },
    Mutation: {
        ...todoMutations,
        ...projectMutations,
        ...projectTodoMutations
    }
}

module.exports = resolvers