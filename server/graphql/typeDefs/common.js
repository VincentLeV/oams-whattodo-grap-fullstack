const { gql } = require("apollo-server-express")

module.exports  = gql`
    scalar Date
    scalar UUID

    interface Timestamps {
        createdAt: Date!
        updatedAt: Date!
    }
`