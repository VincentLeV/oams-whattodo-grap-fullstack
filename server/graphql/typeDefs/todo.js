const { gql } = require("apollo-server-express") 

module.exports = gql`
    type Todo implements Timestamps {
        id: UUID!
        description: String!
        deadline: Date
        priority: Int!
        isCompleted: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    input TodoInput {
        description: String
        deadline: Date
        priority: Int = 0
        isCompleted: Boolean = false
    }

    type TodoId {
        id: UUID!
    }
`