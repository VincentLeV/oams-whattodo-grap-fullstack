const { gql } = require("apollo-server-express") 

module.exports = gql`
    type Project implements Timestamps {
        id: UUID!
        name: String!
        todos: [ProjectTodo]
        createdAt: Date!
        updatedAt: Date!
    }

    input ProjectInput {
        id: UUID!
        name: String
    }
`