const { gql } = require("apollo-server-express") 

module.exports = gql`
    type ProjectTodo implements Timestamps {
        id: UUID!
        projectId: UUID!
        description: String!
        deadline: Date
        priority: Int!
        isCompleted: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }
`