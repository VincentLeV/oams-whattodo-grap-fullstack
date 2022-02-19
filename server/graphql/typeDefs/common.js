const { gql } = require("apollo-server-express")

module.exports  = gql`
    scalar Date

    interface Timestamps {
        createdAt: Date!
        updatedAt: Date!
    }
`