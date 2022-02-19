const { 
    todoQueries, 
    todoMutations,
} = require("./todo")

const resolvers = {
    Query: {
        ...todoQueries
    },
    Mutation: {
        ...todoMutations
    }
}

module.exports = resolvers